import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage{
  registerForm: FormGroup;
  validation_messages = {
    email: [
      {type:"required", message:"El email es requerido"},
      {type:"pattern", message:"El email ingresado no es correcto"}
    ],
    password: [
      {type:"required", message:"El password es requerido"},
      {type:"minlength", message:"El password debe ser minimo de 5 letras"}
    ],
    nombre: [
      {type:"required", message:"El nombre es requerido"},
      {type:"pattern", message:"El nombre debe ser minimo de 3 letras"}
    ],
    apellido: [
      {type:"required", message:"El apellido es requerido"},
      {type:"minlength", message:"El apellido debe ser minimo de 3 letras"}
    ]
  };

  errorMessage:String="";

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthenticateService,
    private navCtrl:NavController,
    private storage:Storage
    ) {
    this.registerForm = this.formBuilder.group({
      email: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")
      ])
      ),
      password: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.minLength(5)
        
      ])
      ),
      
      passconfirm: new FormControl("", Validators.compose([
        Validators.required,
        Validators.minLength(5)
      ])
      ),
      nombre: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
      ),
      apellido: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
      )
    }, {validator: this.matchingPassword('password', 'passconfirm')}
    );
   }

   register(userData){
    this.authService.registerUser(userData).then(()=>{
      this.navCtrl.navigateBack("/login");
    });
    console.log(userData);
   }
   goToLogin(){
     this.navCtrl.navigateBack("/login");
   }

   matchingPassword(passwordKey: string, confirmPasswordKey: string){
    return (group: FormGroup): {[key: string]: any} => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true
        };
      }
    }
  }
}