import { Component, OnInit, ViewChild } from '@angular/core';
import { Storage } from "@ionic/storage";
import { FormGroup, FormControl, FormBuilder, AbstractControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PopoverController, ModalController, IonImg } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

import { Chooser, ChooserResult } from '@ionic-native/chooser/ngx';
import { AvatarComponent } from './avatar/avatar.component';
import { AlertService } from 'src/app/services/shared/alert.service';
@Component({
  selector: 'app-configuser',
  templateUrl: './configuser.page.html',
  styleUrls: ['./configuser.page.scss'],
})
export class ConfiguserPage implements OnInit {
  userForm: FormGroup;
  passwordForm: FormGroup;
  userData:any = {
    user: {

    }
  };
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

  public imagePath;
  constructor(private storage: Storage, 
    public modalController: ModalController,
    private formBuilder:FormBuilder,
    private authS: AuthService,
    private chooser: Chooser,
    public alertService: AlertService
    ) { 
      this.userForm = this.formBuilder.group({
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
        ])
        ),
        avatar: new FormControl("")
      }); 
    //------form Password ---***
      this.passwordForm = this.formBuilder.group({
        current_password: new FormControl(
          "", 
          Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
        ),
        new_password: new FormControl(
          "", 
          Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
        ),
        confirm_password: new FormControl(
          "", 
          Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
        ),
      }, {validator: this.MatchPassword}
      );
      }

    @ViewChild(IonImg) avatar: IonImg;
  ngOnInit() {
  

  }

  private MatchPassword(AC: AbstractControl) {
    const new_password = AC.get('new_password').value // to get value in input tag
    const confirm_password = AC.get('confirm_password').value // to get value in input tag
     if(new_password != confirm_password) {
         AC.get('confirm_password').setErrors( { MatchPassword: true } )
     } else {
         AC.get('confirm_password').setErrors(null);
     }
 }

  
  ionViewWillEnter() {
    this.authS.userData.subscribe(user => {
      this.userData = user;

      this.userForm.patchValue({
        full_name: this.userData.user.full_name,
        email: this.userData.user.email
      });
    })
   // console.log(this.passwordForm.value.current_password);
    }
  
  changePassword(){
    
    console.log(this.passwordForm.value.current_password);
    this.authS.changePassword(
      this.userData.user.token,
      this.passwordForm.value.current_password,
      this.passwordForm.value.new_password).subscribe((res:any) =>{
        if(res.status == 200){
          this.alertService.presentToast(res.massage,4000);
          this.passwordForm.reset();
          this.saveUser();
        }
        else{
          this.alertService.presentToast(res.message,4000);
        }
    })
  }

  saveUser() {
    if(this.userForm.value.full_name !== this.userData.user.full_name){
      if(this.userForm.value.full_name != ''){
        let userData = {
          token: this.userData.user.token,
          full_name: this.userForm.value.full_name
        }
  
        this.authS.editSelf(this.userData.user.token, this.userForm.value.full_name).subscribe((res: any) => {
          if(res.status == 200){
            this.authS.loadUser();
          }
        })
      }
      else {
        console.log("El nombre es requerido")
      }
      
    }else {
      console.log("No hay cambios que guardar")
    }

    
  }

  choose(){
    this.chooser.getFile('image/*')
      .then((file: ChooserResult) => {
        
        this.processImage(file)
      })
      .catch((error: any) => console.error(error));
  }

  async processImage(file) {
    const modal = await this.modalController.create({
      component: AvatarComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        file,
        token: this.userData.user.token
      }
    });

    modal.onDidDismiss().then((data) => {
      if (data !== null && data.data.changed) {
        this.authS.loadUser();
      }
    });
     
    await modal.present();
  }
  

  uploadFile(event){
    
    if (event.target.files.length > 0) {

        let file = event.target.files[0];
        var reader = new FileReader();
        this.imagePath = file;
        reader.readAsDataURL(file); 
        reader.onload = (_event) => { 
          this.userForm.patchValue({
            avatar: reader.result.toString()
          });
          this.userData.user.avatar = reader.result.toString();
        }
        reader.onerror = (err)=> {
          console.log(err);
        } 
    }
  }
}
