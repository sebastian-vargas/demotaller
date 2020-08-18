import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from 'src/app/pages/admin/adminws/edit/edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LessonsComponent } from 'src/app/pages/admin/adminws/lessons/lessons.component';
import { AudioComponent } from 'src/app/components/audio/audio.component';
import { VideoComponent } from 'src/app/components/video/video.component';
import { PdfComponent } from 'src/app/components/pdf/pdf.component';
import { PlyrModule } from 'ngx-plyr';



@NgModule({
  declarations: [EditComponent, LessonsComponent, AudioComponent, VideoComponent, PdfComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PlyrModule,
  ],
  exports: [
    EditComponent, LessonsComponent, AudioComponent, VideoComponent, PdfComponent
  ]
})
export class SharedModule { }
