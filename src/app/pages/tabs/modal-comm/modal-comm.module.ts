import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalCommPageRoutingModule } from './modal-comm-routing.module';

import { ModalCommPage } from './modal-comm.page';
import { CommentFormComponent } from '../comment-form/comment-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalCommPageRoutingModule
  ],
  declarations: [ModalCommPage, CommentFormComponent]
})
export class ModalCommPageModule {}
