import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'comp-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="bg-gray-800 p-6 rounded-2xl shadow-lg overflow-y-auto">
  <h2 class="text-2xl font-bold mb-6 text-white">✍️ Editor do Modelo</h2>

  <!-- Objetivo -->
  <label class="block font-semibold mb-1 text-gray-200">🎯 Objetivo</label>
  <textarea [(ngModel)]="objetivo"
    rows="3"
    (input)="emitMarkdown()"
    class="w-full p-2 border border-gray-700 rounded-lg mb-4 bg-gray-900 text-gray-100">
  </textarea>


  <!-- Informações -->
  <label class="block font-semibold mb-1 text-gray-200">ℹ️ Informações gerais</label>
  <textarea [(ngModel)]="info"
    rows="3"
    (input)="emitMarkdown()"
    class="w-full p-2 border border-gray-700 rounded-lg mb-4 bg-gray-900 text-gray-100">
  </textarea>


  <!-- Itens -->
  <div class="mb-4">
    <label class="block font-semibold mb-2 text-gray-200">✅ Itens para executar</label>

    <div *ngFor="let item of itens; let i = index; trackBy: trackByIndex"
        class="flex items-center space-x-2 bg-zinc-700 p-2 rounded-lg mb-2">
      <input
        [(ngModel)]="item.text"
        (input)="emitMarkdown()"
        class="flex-1 p-2 bg-zinc-700 text-white border-0"
      />
      <button (click)="toggleDone(i)" class="text-green-400">✔️</button>
      <button (click)="removeItem(i)" class="text-red-500">❌</button>
    </div>

    <!-- Botão adicionar item -->
    <button (click)="addItem()"
            class="bg-blue-600 text-white px-3 py-1 rounded-full mt-2">
      ➕ Adicionar item
    </button>
  </div>


  <!-- Anexos -->
  <div class="mb-4">
    <label class="block font-semibold mb-2 text-gray-200">🗂️ Anexos</label>
    <div
      *ngFor="let anexo of anexos; let i = index; trackBy: trackByIndex"
      class="flex items-start space-x-2 bg-zinc-700 p-2 rounded-lg mb-2"
    >
      <textarea
        [ngModel]="anexo"
        (ngModelChange)="updateAnexo(i, $event)"
        rows="2"
        class="flex-1 bg-zinc-700 text-white"
      ></textarea>
      <button (click)="removeAnexo(i)" class="text-red-500">❌</button>
    </div>
    <button
      (click)="addAnexo()"
      class="bg-purple-600 text-white px-3 py-1 rounded-full mt-2"
    >
      ➕ Adicionar anexo
    </button>
  </div>


</div>
  `,
})
export class EditorComponent {
  @Output() markdownChange = new EventEmitter<string>();

  objetivo = '';
  info = '';
  itens: { text: string; done: boolean }[] = [];
  anexos: string[] = [];

  addItem() {
    this.itens.push({ text: '', done: false });
    this.emitMarkdown();
  }

  trackByIndex(index: number): number {
    return index;
  }

  removeItem(i: number) {
    this.itens.splice(i, 1);
    this.emitMarkdown();
  }

  toggleDone(i: number) {
    this.itens[i].done = !this.itens[i].done;
    this.emitMarkdown();
  }

  addAnexo() {
    this.anexos.push('');
    this.emitMarkdown();
  }

  removeAnexo(index: number) {
    this.anexos.splice(index, 1);
    this.emitMarkdown();
  }

  updateAnexo(index: number, value: string) {
    this.anexos[index] = value;
    this.emitMarkdown();
  }

  private generateMarkdown(): string {
    const itensMd = this.itens
      .map(i => `- [${i.done ? 'x' : ' '}] ${i.text}`)
      .join('\n');

    const anexosMd = this.anexos
      .map((a, idx) => `${idx + 1}) ${a}`)
      .join('\n');

    return `
# 🎯 Objetivo
${this.objetivo}

---

# ℹ️ Informações gerais
${this.info}

---

# ✅ Itens para executar
${itensMd}

---

# 🗂️ Anexos
${anexosMd}
`;
  }

  emitMarkdown() {
    this.markdownChange.emit(this.generateMarkdown());
  }


  public loadMarkdown(md: string) {
    // Objetivo
    const objetivoMatch = md.match(/# 🎯 Objetivo\n([\s\S]*?)\n---/);
    this.objetivo = objetivoMatch ? objetivoMatch[1].trim() : '';

    // Informações gerais
    const infoMatch = md.match(/# ℹ️ Informações gerais\n([\s\S]*?)\n---/);
    this.info = infoMatch ? infoMatch[1].trim() : '';

    // Itens
    const itensMatch = md.match(/# ✅ Itens para executar\n([\s\S]*?)\n---/);
    this.itens = [];
    if (itensMatch && itensMatch[1]) {
      itensMatch[1]
        .split('\n')
        .map(l => l.trim())
        .filter(l => l)
        .forEach(line => {
          const match = line.match(/^- \[([ xX])\]\s*(.*)/);
          if (match) {
            this.itens.push({
              done: match[1].toLowerCase() === 'x',
              text: match[2].trim(),
            });
          }
        });
    }

    // Anexos
    const anexosMatch = md.match(/# 🗂️ Anexos\n([\s\S]*)/);
    this.anexos = [];
    if (anexosMatch && anexosMatch[1]) {
      const regex = /(\d+\)\s*[\s\S]*?)(?=\n\d+\)|$)/g;
      let match;
      while ((match = regex.exec(anexosMatch[1])) !== null) {
        const desc = match[1].replace(/^\d+\)\s*/, '').trim();
        this.anexos.push(desc);
      }
    }

    // Emitir para o preview
    this.emitMarkdown();
  }

}
