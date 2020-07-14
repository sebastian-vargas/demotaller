import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditlessonPageRoutingModule } from './editlesson-routing.module';

import { EditlessonPage } from './editlesson.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditlessonPageRoutingModule
  ],
  declarations: [EditlessonPage]
})
export class EditlessonPageModule {}
