import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPdfPageRoutingModule } from './modal-pdf-routing.module';

import { ModalPdfPage } from './modal-pdf.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPdfPageRoutingModule
  ],
  declarations: [ModalPdfPage]
})
export class ModalPdfPageModule {}
