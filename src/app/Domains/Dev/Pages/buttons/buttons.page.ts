import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { BreadcumbComponent } from '@src/app/Shared/Components/breadcumb/breadcumb.component';
import { PageTitleComponent } from '@src/app/Shared/Components/page-title/page-title.component';
import { ThemeService } from '../../../../Shared/Services/theme/theme.service';

@Component({
  selector: 'page-buttons',
  imports: [CommonModule, MatIconModule, BreadcumbComponent, PageTitleComponent],
  templateUrl: './buttons.page.html',
})
export class ButtonsPage {

  private themeService = inject(ThemeService);
  public isDark = this.themeService.theme === 'dark';


}
