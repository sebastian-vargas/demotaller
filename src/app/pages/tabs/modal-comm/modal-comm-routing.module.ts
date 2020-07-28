import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalCommPage } from './modal-comm.page';

const routes: Routes = [
  {
    path: '',
    component: ModalCommPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalCommPageRoutingModule {}
