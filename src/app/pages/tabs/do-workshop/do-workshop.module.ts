import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoWorkshopPageRoutingModule } from './do-workshop-routing.module';

import { DoWorkshopPage } from './do-workshop.page';
import { MainPipeModule } from 'src/app/modules/main-pipe/main-pipe.module';
import { CommentFormComponent } from '../comment-form/comment-form.component';
import { AudioComponent } from 'src/app/components/audio/audio.component';
import { PlyrModule } from 'ngx-plyr';
import { VideoComponent } from 'src/app/components/video/video.component';
import { PdfComponent } from 'src/app/components/pdf/pdf.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoWorkshopPageRoutingModule,
    MainPipeModule,
    PlyrModule,
    SharedModule
  ],
  declarations: [DoWorkshopPage, CommentFormComponent, 
    
  ],
})
export class DoWorkshopPageModule {}
