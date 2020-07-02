import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  validation_messages = {
    email: [
      {type:"required", message:"El email es requerido"},
      {type:"pattern", message:"El email ingresado no es correcto"}
    ],
    password: [
      {type:"required", message:"El password es requerido"},
      {type:"minlength", message:"El password debe ser minimo de 5 letras"}
    ]
  };

  errorMessage:String="";

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthenticateService,
    private navCtrl:NavController,
    private storage:Storage
    ) {
    this.loginForm = this.formBuilder.group({
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
      )
    });
   }

  ngOnInit() {
  }

  loginUser(credentials){
    this.authService.loginUser(credentials).then(res=>{
      this.errorMessage="";
      this.storage.set("isUserLoggedIn", true);
      this.navCtrl.navigateForward("/home");
    }).catch(err=>{
      this.errorMessage = err;
    });
  }

  goToRegister(){
    this.navCtrl.navigateForward('/register');
  }
}
