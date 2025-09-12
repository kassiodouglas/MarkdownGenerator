import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'comp-toolbar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
<div class="w-full flex space-x-4 justify-center md:justify-end ">
      <input
        [(ngModel)]="filename"
        class="p-2 bg-gray-900 text-gray-100 rounded-lg w-48"
        placeholder="Número da task"
      />
      <button class="button button-only-icon"  title="Baixar .md" (click)="download()">💾</button>
      <button class="button button-only-icon" title="Copiar markdown" (click)="copy()">📋</button>
      <div class="button button-only-icon" title="Carregar .md">
        <label class="button button-only-icon">
          📂
          <input type="file" hidden accept=".md" (change)="upload($event)" />
        </label>
      </div>
    </div>
  `,
})
export class ToolbarComponent {
  @Input() markdown: string = '';
  @Output() fileLoaded = new EventEmitter<string>();

  filename: string = 'TSK0000000.md';

  download() {
    const blob = new Blob([this.markdown], { type: 'text/markdown;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = this.filename || 'documento.md';
    link.click();
    URL.revokeObjectURL(link.href);
  }

  copy() {
    navigator.clipboard.writeText(this.markdown || '').then(() => {
      alert('📋 Markdown copiado para a área de transferência!');
    });
  }

  upload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.filename = file.name;

    const reader = new FileReader();
    reader.onload = () => {
      this.fileLoaded.emit(reader.result as string);
    };
    reader.readAsText(file);
  }
}
