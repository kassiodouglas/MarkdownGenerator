import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbComponent } from '@src/app/Shared/Components/breadcumb/breadcumb.component';
import { PageTitleComponent } from '@src/app/Shared/Components/page-title/page-title.component';

@Component({
  selector: 'page-dropdown',
  imports:[CommonModule, BreadcumbComponent, PageTitleComponent],
  templateUrl: './dropdown.page.html',
})
export class DropdownPage {
  constructor() {}
}
