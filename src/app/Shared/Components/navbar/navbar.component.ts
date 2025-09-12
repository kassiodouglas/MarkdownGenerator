import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'comp-navbar',
  imports: [CommonModule],
  template: `
    <div [ngClass]="[CLASS_EXTERNAL, classPosition]">
     <ng-content select="[body]"></ng-content>
    </div>
  `,
})
export class NavbarComponent implements OnChanges{

  CLASS_EXTERNAL = `
  bg-white min-h-[60px] w-screen flex flex-row items-center px-10 shadow-md bg-light dark:bg-dark dark:text-white z-40 animate-fade-slide-in-top
  `;

  @Input() fixed = false;

  public navbarService = inject(NavbarService);

  ngOnChanges(changes:SimpleChanges){
    this.navbarService.fixed = changes['fixed'].currentValue;
    this.navbarService.emitNavbarPosition();
  }

  get classPosition() {
    return this.navbarService.fixed ? 'fixed top-0 left-0' : 'relative';
  }


}
