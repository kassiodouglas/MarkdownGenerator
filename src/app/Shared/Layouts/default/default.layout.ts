import { SidebarComponent } from '../../Components/sidebar/sidebar.component';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../Components/navbar/navbar.component";
import { MatIconModule } from '@angular/material/icon';
import { ThemeService } from '../../Services/theme/theme.service';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'layout-default',
  imports: [
    CommonModule, RouterOutlet, NavbarComponent, MatIconModule,
    MatMenuModule, SidebarComponent
  ],
  template: `

      <comp-navbar [fixed]="navbarFixed" >
        <div body class="flex flex-row space-x-4 items-center w-full">

          <!-- Botões à esquerda -->
          <button class="button-only-icon" (click)="toggleSidebarPosition()">
            <mat-icon class="dark:text-white">menu</mat-icon>
          </button>

          <button class="hidden md:flex button-only-icon" (click)="themeService.toggleTheme()">
            <mat-icon class="text-yellow-500 scale-75">@if(themeService.theme === 'dark'){bedtime}@else{sunny}</mat-icon>
          </button>

          <button class="hidden md:flex button-only-icon" (click)="toggleNavbarPosition()">
            <mat-icon class="scale-75">@if(navbarFixed){arrow_upward}@else{arrow_downward}</mat-icon>
          </button>

          <!-- Campo de busca centralizado -->
          <div class="flex justify-center w-full md:pe-32">
            <div class="relative w-full max-w-xl min-w-[300px]">
              <span class="absolute inset-y-0 left-0 flex items-center pl-4 text-slate-500 dark:text-slate-400 pointer-events-none">
                <span class="material-icons">search</span>
              </span>
              <input
                type="search"
                placeholder="Pesquisar na aplicação toda..."
                class="w-full pl-12 pr-4 py-3 rounded-sm dark:bg-slate-800/80 border dark:border-slate-700 dark:text-white placeholder-slate-600 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition duration-150 ease-in-out"
              >
            </div>
          </div>

          <!-- Avatar e nome do usuário com menu -->
          <div class="hidden md:flex items-center space-x-2 min-w-max pe-4">
            <!-- Avatar -->
            <div class="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-600 overflow-hidden flex items-center justify-center text-slate-700 dark:text-white font-semibold text-sm">
              <!-- <img src="URL_DO_AVATAR" alt="Avatar" class="w-full h-full object-cover"> -->
              KD
            </div>

            <!-- Nome e botão com seta -->
            <button
              [matMenuTriggerFor]="userMenu"
              class="flex items-center space-x-1 text-sm font-medium text-slate-800 dark:text-white hover:opacity-80 focus:outline-none"
            >
              <span>Kássio Douglas</span>
              <mat-icon class="text-base">arrow_drop_down</mat-icon>
            </button>
          </div>

          <!-- Mat Menu -->
          <mat-menu #userMenu="matMenu" yPosition="below" xPosition="after">
            <button mat-menu-item >
              <mat-icon>person</mat-icon>
              <span>Perfil</span>
            </button>
            <button mat-menu-item>
              <mat-icon>settings</mat-icon>
              <span>Configurações</span>
            </button>
            <button mat-menu-item>
              <mat-icon>logout</mat-icon>
              <span>Sair</span>
            </button>
          </mat-menu>

        </div>
      </comp-navbar>

      <main [ngClass]="{'mt-16': navbarFixed}" class="animate-fade-slide-in-left flex flex-row">
        <div class="transition-all duration-300 shadow-sm z-40" [ngClass]="{'w-0':!sidebarOpen, 'w-[250px]':sidebarOpen}">
          <comp-sidebar [sidebarOpen]="sidebarOpen"/>
        </div>
        <div class="transition-all duration-300 ease-in-out flex-1">
          <div>
          <router-outlet></router-outlet>
          </div>
        </div>
      </main>
  `,
})
export class DefaultLayout {

  public themeService = inject(ThemeService);

  navbarFixed = true;
  sidebarOpen = false;

  toggleNavbarPosition() {
    this.navbarFixed = !this.navbarFixed;
  }

  toggleSidebarPosition() {
    this.sidebarOpen = !this.sidebarOpen;
  }

}
