import { Component, OnInit } from '@angular/core';
//import { FormGroup, FormControl } from '@angular/forms';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from "@ionic/storage";
import { AlertService } from 'src/app/services/shared/alert.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
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
      {type:"minlength", message:"El mensaje debe ser minimo de 3 palabras"}
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
    private formBuilder: FormBuilder

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
          Validators.minLength(10)
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

  send(userForm){
    console.log("enviado");
    this.alertService.basicAlert("Tú mensaje ha sido enviado con exito", ['Aceptar'], "Mensaje enviado.");
  }

}
