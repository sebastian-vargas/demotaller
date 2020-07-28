import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';

import {AuthService} from 'src/app/services/auth.service'
import { from } from 'rxjs';
import { identifierModuleUrl } from '@angular/compiler';

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
    private navCtrl:NavController,
    private storage:Storage,
    private authS: AuthService
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
    this.authS.login(credentials).subscribe(response => {
      let res:any = response; 
      if(res.status == 200){
        let user = res.user;
        user.isLoggedIn = true;
        this.storage.set('userData', user);
        this.authS.userData$.next(user);
        this.authS.isLoggedIn$.next(true);
        this.navCtrl.navigateRoot("menu/tabs/home");
      }
      else {
        console.log(res.message);
      }
    });
  }

  goToRegister(){
    this.navCtrl.navigateRoot('/register');
  }
}
