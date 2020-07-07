import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { MenuPage } from "./menu.page";

const routes: Routes = [
  {
    path: "",
    component: MenuPage,
    children: [
      {
        path: "",
        redirectTo: "tabs",
        pathMatch: "full",
      },
      {
        path: "tabs",
        loadChildren: () =>
          import("../tabs/tabs.module").then((m) => m.TabsPageModule),
      },
      {
        path: 'contact',
        loadChildren: () => import('../contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: "workshop/:id",
        loadChildren: () =>
          import("../list-workshop/list-workshop.module").then(
            (m) => m.ListWorkshopPageModule
          ),
      },
      {
        path: 'do-workshop',
        loadChildren: () => import('../do-workshop/do-workshop.module').then( m => m.DoWorkshopPageModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('../admin/admin.module').then( m => m.AdminPageModule)
      },
      {
        path: 'adminws',
        loadChildren: () => import('../adminws/adminws.module').then( m => m.AdminwsPageModule)
      },
      {
        path: "**",
        redirectTo: "tabs"
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
