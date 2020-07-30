import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoWorkshopPageRoutingModule } from './do-workshop-routing.module';

import { DoWorkshopPage } from './do-workshop.page';
import { ModalPdfPage } from '../modal-pdf/modal-pdf.page';
import { AudioPlayerComponent } from './audio-player/audio-player.component';
import { MainPipeModule } from 'src/app/modules/main-pipe/main-pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoWorkshopPageRoutingModule,
    MainPipeModule
  ],
  declarations: [DoWorkshopPage, ModalPdfPage, AudioPlayerComponent],
  entryComponents:[ModalPdfPage],
})
export class DoWorkshopPageModule {}
