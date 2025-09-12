import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from "@src/app/Shared/Components/page-title/page-title.component";
import { BreadcumbComponent } from "@src/app/Shared/Components/breadcumb/breadcumb.component";

@Component({
  selector: 'page-theme',
  imports: [CommonModule, PageTitleComponent, BreadcumbComponent],
  templateUrl: './theme.page.html',
})
export class ThemePage {
  constructor() {}
}
