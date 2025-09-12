import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbComponent } from '@src/app/Shared/Components/breadcumb/breadcumb.component';
import { PageTitleComponent } from '@src/app/Shared/Components/page-title/page-title.component';

@Component({
  selector: 'page-notiflix',
  imports:[CommonModule,BreadcumbComponent,PageTitleComponent],
  templateUrl: './notiflix.page.html',
})
export class NotiflixPage {
  constructor() {}
}
