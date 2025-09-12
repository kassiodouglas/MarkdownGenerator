import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'page-start',
  imports:[CommonModule, RouterModule],
  templateUrl: './start.page.html',
})
export class StartPage {
  constructor() {}
}
