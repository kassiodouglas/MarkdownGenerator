import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbComponent } from '@src/app/Shared/Components/breadcumb/breadcumb.component';
import { PageTitleComponent } from '@src/app/Shared/Components/page-title/page-title.component';

@Component({
  selector: 'page-page-title',
  imports:[CommonModule, BreadcumbComponent, PageTitleComponent],
  templateUrl: './page-title.page.html',
})
export class PageTitlePage {
  constructor() {}
}
