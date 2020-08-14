import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditComponent } from 'src/app/pages/admin/adminws/edit/edit.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LessonsComponent } from 'src/app/pages/admin/adminws/lessons/lessons.component';



@NgModule({
  declarations: [EditComponent, LessonsComponent],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

  ],
  exports: [
    EditComponent, LessonsComponent
  ]
})
export class SharedModule { }
