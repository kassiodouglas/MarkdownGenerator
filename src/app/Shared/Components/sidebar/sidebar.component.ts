import { Component, inject, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarService } from '../navbar/services/navbar.service';
import { SidebarService } from './services/sidebar.service';

@Component({
  selector: 'comp-sidebar',
  imports: [CommonModule],
  template: `
    <div
      class="sticky p-2 transition-transform duration-300 ease-in-out w-[250px] border-r bg-white dark:bg-gray-800 shadow-lg z-50"
      [ngClass]="{
        'top-16': setOnTop,
        'top-0': !setOnTop,
        'min-h-[calc(100vh-65px)]': setOnTop,
        'min-h-[calc(100vh)]': !setOnTop,
      }"
      [class.-translate-x-full]="!sidebarOpen"
      [class.translate-x-0]="sidebarOpen"
    >
      Sidebar Component
    </div>
  `,
})
export class SidebarComponent implements OnInit {

  private navbarService = inject(NavbarService);
  private sidebarService = inject(SidebarService);

  setOnTop = true;
  @Input() sidebarOpen = false;

  ngOnInit(){
    this.navbarService.navbarPosition$.subscribe((response) => {
      this.setOnTop = response;
    });

    this.sidebarService.sidebarPosition$.subscribe((response) => {
      this.sidebarOpen = response;
    });
  }

 }
