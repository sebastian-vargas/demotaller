import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddwsPage } from './addws.page';

const routes: Routes = [
  {
    path: '',
    component: AddwsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddwsPageRoutingModule {}
