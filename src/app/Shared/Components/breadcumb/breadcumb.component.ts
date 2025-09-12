import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'comp-breadcumb',
  imports: [CommonModule, MatIconModule, RouterModule],
  template: `
    <nav class="text-sm px-2 text-gray-500" aria-label="Breadcrumb">
      <ol class="list-none p-0 inline-flex space-x-1">

        <!-- Home -->
        <li class="flex items-center">
          <button routerLink="/" class="text-gray-600 hover:underline">Início</button>
          <mat-icon class="opacity-40">keyboard_arrow_right</mat-icon>
        </li>

        @for (link of links; track link; let last = $last) {
          <li class="flex items-center">

            @if(link?.link){
              <a [href]="link?.link" class="text-gray-600 hover:underline">{{link.text}}</a>
            }@else {
              <span class="text-gray-400">{{link.text}}</span>
            }

            @if(!last){<mat-icon class="opacity-40">keyboard_arrow_right</mat-icon>}
          </li>
        }


        <!-- Página atual
        <li class="flex items-center text-gray-500" aria-current="page">
          Detalhes
        </li> -->

      </ol>
    </nav>
  `,
})
export class BreadcumbComponent {

  @Input() links: Array<{ link?: string | null | undefined, text: string }> = []

}
