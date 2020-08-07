import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminPage } from './admin.page';

const routes: Routes = [
  {
    path: '',
    component: AdminPage,
    children: [
      {
        path: 'adminws',
        loadChildren: () => import('./adminws/adminws.module').then( m => m.AdminwsPageModule)
      },
      {
        path: 'adminuser',
        loadChildren: () => import('./adminuser/adminuser.module').then( m => m.AdminuserPageModule)
      },
      {
        path: '',
        redirectTo:"adminws"
      },

      {
        path: "adminws/:id",
          children: [
            {
              path: "",
              loadChildren: () => import('./editlesson/editlesson.module').then((m) => m.EditlessonPageModule),
            },
          ]
      },
    ]
  },
  {
    path: 'modal-user',
    loadChildren: () => import('./modal-user/modal-user.module').then( m => m.ModalUserPageModule)
  },
  {
    path: 'modal-ws',
    loadChildren: () => import('./modal-ws/modal-ws.module').then( m => m.ModalWsPageModule)
  },
  {
    path: 'addws',
    loadChildren: () => import('./addws/addws.module').then( m => m.AddwsPageModule)
  },
  {
    path: 'editlesson',
    loadChildren: () => import('./editlesson/editlesson.module').then( m => m.EditlessonPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminPageRoutingModule {}
