import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddwsPageRoutingModule } from './addws-routing.module';

import { AddwsPage } from './addws.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddwsPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [AddwsPage]
})
export class AddwsPageModule {}
