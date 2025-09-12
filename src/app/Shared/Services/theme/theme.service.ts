import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private defaultTheme = 'dark';
  private htmlTag!: HTMLElement;

  constructor() {
    // Executa após DOM estar disponível
    if (typeof window !== 'undefined') {
      this.htmlTag = document.querySelector('html')!;
    }
  }

  initializeTheme(defaultTheme: string = 'dark') {
    this.defaultTheme = defaultTheme || this.defaultTheme;
    this.applyTheme(this.theme);
  }

  toggleTheme() {
    const newTheme = this.theme === 'dark' ? 'light' : 'dark';
    this.applyTheme(newTheme);
  }

  private applyTheme(theme: string) {
    this.htmlTag.classList.remove('dark', 'light');
    this.htmlTag.classList.add(theme);
    localStorage.setItem('theme', theme);
  }

  get theme(): string {
    return localStorage.getItem('theme') || this.defaultTheme;
  }

  set theme(value: string) {
    this.applyTheme(value);
  }
}

