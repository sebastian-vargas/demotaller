import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminwsPage } from './adminws.page';

const routes: Routes = [
  {
    path: '',
    component: AdminwsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminwsPageRoutingModule {}
