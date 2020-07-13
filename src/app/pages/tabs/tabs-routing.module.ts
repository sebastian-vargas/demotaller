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
        path: "favorites",
        loadChildren: () =>
          import("./workshops/workshops.module").then(
            (m) => m.WorkshopsPageModule
          ),
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
        path: "",
        redirectTo: "home",
        pathMatch: "full",
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
