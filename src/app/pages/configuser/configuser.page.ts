import { Component, OnInit } from '@angular/core';
import { Storage } from "@ionic/storage";
@Component({
  selector: 'app-configuser',
  templateUrl: './configuser.page.html',
  styleUrls: ['./configuser.page.scss'],
})
export class ConfiguserPage implements OnInit {
  user = {
    nombre:"Sebastian",
    email: "sebas@sebas",
    password: "sebas"
  };
  constructor(private storage: Storage) { 
  }
  //user = this.storage.get("user");

  ngOnInit() {

  }

 
  
}
