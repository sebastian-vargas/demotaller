import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/shared/alert.service';

import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-register-modal',
  templateUrl: './register-modal.component.html',
  styleUrls: ['./register-modal.component.scss'],
})
export class RegisterModalComponent implements OnInit {
  @Output("handleAction") action: EventEmitter<any> = new EventEmitter();

  registerForm: FormGroup;
  validation_messages = {
    full_name: [
      {type:"required", message:"El nombre es requerido"},
      {type:"minlength", message:"El nombre debe ser minimo de 3 letras"}
    ],
    email: [
      {type:"required", message:"El email es requerido"},
      {type:"pattern", message:"El email ingresado no es correcto"}
    ],
    password: [
      {type:"required", message:"El password es requerido"},
      {type:"minlength", message:"la contraseña debe ser minimo de 5 digitos"}
    ],
  };

  errorMessage:String="";

  constructor(
    private formBuilder:FormBuilder,
    private navCtrl:NavController,
    private storage:Storage,
    private authS: AuthService,
    private alertService: AlertService,
    ) {
    this.registerForm = this.formBuilder.group({
      full_name: new FormControl(
        "", 
        Validators.compose([
        Validators.required,
        Validators.minLength(3)
      ])
      ),
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
        Validators.minLength(5),
      ])
      ),
    }, {validator: this.MatchPassword}
    );
   }

  ngOnInit(){

  }

  private MatchPassword(AC: AbstractControl) {
    const password = AC.get('password').value // to get value in input tag
    const passconfirm = AC.get('passconfirm').value // to get value in input tag
     if(password != passconfirm) {
         console.log('false');
         AC.get('passconfirm').setErrors( { MatchPassword: true } )
     } else {
         console.log('true')
         AC.get('passconfirm').setErrors(null);
     }
 }

   goToLogin(){
     this.action.emit(1);
   }

   onPassConfirmChange(value){
    if(value !==this.registerForm.controls['password'].value){
      console.log("diferentes")
      this.registerForm.controls['passconfirm'].setErrors({'mismatchedPasswords': true});
    }
   }

  registerUser(register){
    this.authS.register(register).subscribe(response => {
      let res:any = response; 
      if(res.status == 200){   
        this.alertService.basicAlert("Se han registrado tus datos, ahora usa tu correo y contraseña registrados para ingresar", ['Aceptar'], "¡Registro Exitoso!");
        this.goToLogin();
        this.registerForm.reset();
      }
      else {
        console.log(res.message);
      }
    });

  }
}
