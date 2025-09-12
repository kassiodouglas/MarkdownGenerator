import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'comp-preview',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="bg-gray-800 p-6 rounded-2xl shadow-lg overflow-y-auto">
    <h2 class="text-2xl font-bold mb-4 text-white">👀 Preview Markdown</h2>
    <pre class="whitespace-pre-wrap text-gray-100">{{ markdown }}</pre>
  </div>
  `,
})
export class PreviewComponent {
  @Input() markdown: string = '';
}
