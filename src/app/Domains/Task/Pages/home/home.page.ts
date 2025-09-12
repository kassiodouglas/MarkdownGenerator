import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcumbComponent } from "@src/app/Shared/Components/breadcumb/breadcumb.component";
import { PageTitleComponent } from "@src/app/Shared/Components/page-title/page-title.component";
import { MatIconModule } from '@angular/material/icon';
import { EditorComponent } from "../../Components/editor.component";
import { PreviewComponent } from "../../Components/preview.component";
import { ToolbarComponent } from "../../Components/toolbar.component";

@Component({
  selector: 'page-home',
  imports: [CommonModule, BreadcumbComponent, PageTitleComponent, MatIconModule, EditorComponent, PreviewComponent, ToolbarComponent],
  templateUrl: './home.page.html',
})
export class HomePage {
  @ViewChild(EditorComponent) editor!: EditorComponent;
  markdown: string = '';

  onMarkdownChange(md: string) {
    this.markdown = md;
  }

  onFileLoaded(md: string) {
    this.markdown = md;
    // Popula o editor
    if (this.editor) {
      this.editor.loadMarkdown(md);
    }
  }
}
