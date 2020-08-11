import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalWsPageRoutingModule } from './modal-ws-routing.module';

import { ModalWsPage } from './modal-ws.page';
import { MainPipeModule } from 'src/app/modules/main-pipe/main-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalWsPageRoutingModule,
    MainPipeModule,
    ReactiveFormsModule
  ],
  declarations: [ModalWsPage]
})
export class ModalWsPageModule {}
