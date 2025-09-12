import { Routes } from '@angular/router';
import { ErrorComponent } from './Core/Pages/error/error.component';
import { StartPage } from './Domains/Home/Pages/start/start.page';
import { HomePage } from './Domains/Task/Pages/home/home.page';

export const routes: Routes = [

  { path: '', loadComponent:()=>StartPage },

  { path: 'tasks', loadComponent:()=>HomePage },

  { path: 'erro/:errorCode', loadComponent: () => ErrorComponent },

  { path: '**', redirectTo: 'erro/404' },

];
