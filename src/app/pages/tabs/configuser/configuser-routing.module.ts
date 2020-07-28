import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfiguserPage } from './configuser.page';

const routes: Routes = [
  {
    path: '',
    component: ConfiguserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiguserPageRoutingModule {}
