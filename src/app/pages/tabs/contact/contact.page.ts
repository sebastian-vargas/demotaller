import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from "@ionic/storage";
import { AlertService } from 'src/app/services/shared/alert.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  userForm: FormGroup;
  validation_messages = {
    email: [
      {type:"required", message:"El email es requerido"},
      {type:"pattern", message:"El email ingresado no es correcto"}
    ],
    full_name: [
      {type:"required", message:"El nombre es requerido"},
      {type:"minlength", message:"El nombre debe ser minimo de 3 letras"}
    ],
    message: [
      {type:"required", message:"El mensaje es requerido"},
      {type:"minlength", message:"El mensaje debe ser minimo de una palabra"}
    ],
  };

  userData:any = {
    user: {

    }
  };

 /* userForm = new FormGroup({
    full_name: new FormControl(''),
    email: new FormControl(''),
    //avatar: new FormControl('')
  });*/

  constructor(
    private storage: Storage, 
    private authS: AuthService, 
    private alertService: AlertService,
    private formBuilder: FormBuilder,
    public loadingCtrl: LoadingController

    ) {
      this.userForm = this.formBuilder.group({
        email: new FormControl(
          "", 
          Validators.compose([
          Validators.required,
          Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
        ])
        ),
        full_name: new FormControl(
          "", 
          Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
        ),
        message: new FormControl(
          "", 
          Validators.compose([
          Validators.required,
          Validators.minLength(3)
        ])
        ),
      });
     }

  ngOnInit() {
    this.authS.userData.subscribe(user => {
      this.userData = user;

      this.userForm.patchValue({
        full_name: this.userData.user.full_name,
        email: this.userData.user.email
      });
    })
  }
  
  async send(userForm){

    this.loadingCtrl.create({
      message: 'Procesando, por favor espere...'
    }).then((res) => {
      res.present();
    });

    this.authS.sendEmail(
      this.userForm.value.full_name, 
      this.userForm.value.email, 
      this.userForm.value.message).subscribe((res:any) => {
        if(res.status == "200"){
          this.alertService.basicAlert(res.message, ['Aceptar'], "Mensaje enviado.");
        }
        else{
          this.alertService.basicAlert(res.message, ['Aceptar'], "Alerta de Mensaje");
        }
        this.loadingCtrl.dismiss();
        this.userForm.patchValue({
        message: "",
        });
      });
      //await loading.onDidDismiss();
  }

}
