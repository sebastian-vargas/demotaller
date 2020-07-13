import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalPdfPage } from './modal-pdf.page';

const routes: Routes = [
  {
    path: '',
    component: ModalPdfPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalPdfPageRoutingModule {}
