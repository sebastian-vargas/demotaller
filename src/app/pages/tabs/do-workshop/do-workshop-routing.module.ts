import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoWorkshopPage } from './do-workshop.page';

const routes: Routes = [
  {
    path: '',
    component: DoWorkshopPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoWorkshopPageRoutingModule {}
