import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-configuser',
  templateUrl: './configuser.page.html',
  styleUrls: ['./configuser.page.scss'],
})
export class ConfiguserPage implements OnInit {
  userData:any = {
    user: {

    }
  };

  public imagePath;

  userForm = new FormGroup({
    full_name: new FormControl(''),
    email: new FormControl(''),
    avatar: new FormControl('')
  })

  passwordForm = new FormGroup({
    current_password: new FormControl(''),
    new_password: new FormControl(''),
    confirm_password: new FormControl('')
  });

  constructor(private storage: Storage, private authS: AuthService) {   }

  ngOnInit() {
    

    this.authS.userData.subscribe(user => {
      this.userData = user;

      this.userForm.patchValue({
        full_name: this.userData.user.full_name,
        email: this.userData.user.email
      });
    })

  }
  

  changePassword(){
    console.log(this.passwordForm.value);
  }

  saveUser() {
    if(this.userForm.value.full_name !== this.userData.user.full_name || this.userForm.value.avatar !== ''){
      let userData = {
        id_user: this.userData.user.id_user,
        ...this.userForm.value
      }
      console.log(userData);
    }else {
      console.log("No hay cambios que guardar")
    }

    
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
