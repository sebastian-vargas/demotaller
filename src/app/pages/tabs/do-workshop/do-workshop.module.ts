import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoWorkshopPageRoutingModule } from './do-workshop-routing.module';

import { DoWorkshopPage } from './do-workshop.page';
import { ModalPdfPage } from '../modal-pdf/modal-pdf.page';
import { SafePipe } from 'src/app/pipes/safe.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoWorkshopPageRoutingModule
  ],
  declarations: [DoWorkshopPage, ModalPdfPage],
  entryComponents:[ModalPdfPage]
})
export class DoWorkshopPageModule {}
