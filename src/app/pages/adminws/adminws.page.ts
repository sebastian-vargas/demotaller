import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-adminws',
  templateUrl: './adminws.page.html',
  styleUrls: ['./adminws.page.scss'],
})
export class AdminwsPage implements OnInit {
  registerForm:FormGroup;
  upload={};
  validation_messages = {
    taller: [
      {type:"required", message:"El nombre del taller es requerido"},
      {type:"minlength", message:"El nombre del taller debe ser minimo de 5 letras"}
    ],
  };

  errorMessage:String="";

  constructor(
    private formBuilder:FormBuilder,
    navCtrl:NavController, 
    storage:Storage,
    private authService:AuthenticateService
    ) {
      this.registerForm = this.formBuilder.group({
        taller: new FormControl(
          "", 
          Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
        ),
        descripcion: new FormControl(
          "",
          Validators.compose([
          Validators.required,
          Validators.minLength(5)
          ])
        ),
        blobURL: new FormControl(
          "",
          
        )

      }
      );
   }

  ngOnInit() {
  }

  agregar(wsData){
    this.authService.addWorkshop(wsData);
    console.log(wsData);
  }

  loadImageFromDevice(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.readAsArrayBuffer(file); 
    reader.onload = () => {
      // get the blob of the image:
      let blob: Blob = new Blob([new Uint8Array((reader.result as ArrayBuffer))]);
      // create blobURL, such that we could use it in an image element:
      let blobURL: string = URL.createObjectURL(blob);
      console.log( blobURL);
      //this.upload = blobURL;
    };
    reader.onerror = (error) => {
      //handle errors
    };
  };

}
