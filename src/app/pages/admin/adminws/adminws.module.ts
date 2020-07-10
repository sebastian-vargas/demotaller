import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminwsPageRoutingModule } from './adminws-routing.module';

import { AdminwsPage } from './adminws.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminwsPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [AdminwsPage]
})
export class AdminwsPageModule {}
