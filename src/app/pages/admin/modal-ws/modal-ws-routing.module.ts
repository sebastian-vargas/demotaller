import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalWsPage } from './modal-ws.page';

const routes: Routes = [
  {
    path: '',
    component: ModalWsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalWsPageRoutingModule {}
