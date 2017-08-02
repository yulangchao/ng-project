import { Routes, RouterModule }  from '@angular/router';

import { Chat } from './chat.component';
import { ModuleWithProviders } from '@angular/core';

// noinspection TypeScriptValidateTypes
export const routes: Routes = [
  {
    path: '',
    component: Chat
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
