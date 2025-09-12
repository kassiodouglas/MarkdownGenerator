import { Component, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbComponent } from '@src/app/Shared/Components/breadcumb/breadcumb.component';
import { PageTitleComponent } from '@src/app/Shared/Components/page-title/page-title.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'page-navbar',
  imports: [CommonModule, BreadcumbComponent, PageTitleComponent, MatIconModule],
  templateUrl: './navbar.page.html',
})
export class NavbarPage {

}
