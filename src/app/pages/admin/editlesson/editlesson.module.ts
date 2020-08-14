import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditlessonPageRoutingModule } from './editlesson-routing.module';

import { EditlessonPage } from './editlesson.page';
import { MainPipeModule } from 'src/app/modules/main-pipe/main-pipe.module';
import { UsersComponent } from '../adminws/users/users.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditlessonPageRoutingModule,
    ReactiveFormsModule,
    MainPipeModule,
    SharedModule
  ],
  declarations: [EditlessonPage,UsersComponent]
})
export class EditlessonPageModule {}
