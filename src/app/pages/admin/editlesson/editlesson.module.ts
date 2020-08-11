import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditlessonPageRoutingModule } from './editlesson-routing.module';

import { EditlessonPage } from './editlesson.page';
import { MainPipeModule } from 'src/app/modules/main-pipe/main-pipe.module';
import { EditComponent } from '../adminws/edit/edit.component';
import { LessonsComponent } from '../adminws/lessons/lessons.component';
import { UsersComponent } from '../adminws/users/users.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditlessonPageRoutingModule,
    ReactiveFormsModule,
    MainPipeModule
  ],
  declarations: [EditlessonPage,EditComponent,LessonsComponent,UsersComponent]
})
export class EditlessonPageModule {}
