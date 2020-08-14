import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminwsPageRoutingModule } from './adminws-routing.module';

import { AdminwsPage } from './adminws.page';
import { EditComponent } from './edit/edit.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminwsPageRoutingModule,
    SharedModule
  ],
  declarations: [AdminwsPage]
})
export class AdminwsPageModule {}
