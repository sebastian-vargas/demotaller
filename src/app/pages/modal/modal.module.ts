import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalPageRoutingModule } from './modal-routing.module';

import { ModalPage } from './modal.page';
import { LoginModalComponent } from 'src/app/components/login-modal/login-modal.component';
import { RegisterModalComponent } from 'src/app/components/register-modal/register-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ModalPage, LoginModalComponent, RegisterModalComponent]
})
export class ModalPageModule {}
