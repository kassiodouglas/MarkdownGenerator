import { CommonModule } from '@angular/common';
import { Component, HostListener, inject, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { NavbarService } from '../navbar/services/navbar.service';

@Component({
  selector: 'comp-page-title',
  imports:[CommonModule, MatIconModule, RouterModule],
  templateUrl: './page-title.component.html',
})
export class PageTitleComponent implements OnInit {

  private navbarService = inject(NavbarService);

  @Input({required:true}) title!:string;
  @Input() text!:string;
  @Input() useBackButton = true;

  setOnTop = true;

  ngOnInit(){
    this.navbarService.navbarPosition$.subscribe((response) => {
      this.setOnTop = response;
    });
  }

  goBack(){
    window.history.length > 1 ? window.history.back() : window.location.assign('/');
  }

  get hasHistory(): boolean{
    return this.useBackButton && window.history.length > 1
  }

  scrolled = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }

}
