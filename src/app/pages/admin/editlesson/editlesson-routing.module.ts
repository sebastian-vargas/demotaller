import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditlessonPage } from './editlesson.page';

const routes: Routes = [
  {
    path: '',
    component: EditlessonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditlessonPageRoutingModule {}
