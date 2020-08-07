import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { TabsPage } from "./tabs.page";

const routes: Routes = [
  {
    path: "",
    component: TabsPage,
    children: [
      {
        path: "home",
        loadChildren: () =>
          import("./home/home.module").then((m) => m.HomePageModule),
      },
      {
        path: "workshops",
        loadChildren: () =>
          import("./workshops/workshops.module").then(
            (m) => m.WorkshopsPageModule
          ),
          
      },
      {
        path: "workshop/:id",
          children: [
            {
              path: "",
              loadChildren: () => import("../tabs/list-workshop/list-workshop.module").then((m) => m.ListWorkshopPageModule),
            },
            {
              path: "lesson/:lesson",
              loadChildren: () =>
                import("../tabs/do-workshop/do-workshop.module").then((m) => m.DoWorkshopPageModule),
            },
          ]
      },
      {
        path: 'contact',
        loadChildren: () => import('../tabs/contact/contact.module').then( m => m.ContactPageModule)
      },
      {
        path: 'about-us',
        loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsPageModule)
      },
      {
        path: 'configuration',
        loadChildren: () => import('./configuser/configuser.module').then( m => m.ConfiguserPageModule)
      },
      {
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
    ],
  },
  {
    path: 'modal-comm',
    loadChildren: () => import('./modal-comm/modal-comm.module').then( m => m.ModalCommPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
