import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './Shared/Services/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template:`
  <router-outlet></router-outlet>`,
})
export class AppComponent {

  private themeService = inject(ThemeService);

  ngOnInit(){
    this.themeService.initializeTheme('dark');
  }
}
