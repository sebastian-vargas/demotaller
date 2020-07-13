import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListWorkshopPage } from './list-workshop.page';

const routes: Routes = [
  {
    path: '',
    component: ListWorkshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListWorkshopPageRoutingModule {}
