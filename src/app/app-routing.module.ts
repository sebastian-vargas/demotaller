import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: "",
    redirectTo: "menu",
    pathMatch: "full",
  },
  {
    path: "menu",
    loadChildren: () =>
      import("./pages/menu/menu.module").then((m) => m.MenuPageModule),
      canActivate: [LoginGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: "**",
    redirectTo: "menu",
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then( m => m.AdminPageModule)
  },
  {
    path: 'modal-pdf',
    loadChildren: () => import('./pages/modal-pdf/modal-pdf.module').then( m => m.ModalPdfPageModule)
  },
  {
    path: 'adminuser',
    loadChildren: () => import('./pages/admin/adminuser/adminuser.module').then( m => m.AdminuserPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
