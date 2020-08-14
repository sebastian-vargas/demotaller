import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalWsPageRoutingModule } from './modal-ws-routing.module';

import { ModalWsPage } from './modal-ws.page';
import { MainPipeModule } from 'src/app/modules/main-pipe/main-pipe.module';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { ContentFormComponent } from './content-form/content-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalWsPageRoutingModule,
    MainPipeModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [ModalWsPage,ContentFormComponent]
})
export class ModalWsPageModule {}
