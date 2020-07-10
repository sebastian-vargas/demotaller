import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalUserPage } from '../modal-user/modal-user.page';



@Component({
  selector: 'app-adminuser',
  templateUrl: './adminuser.page.html',
  styleUrls: ['./adminuser.page.scss'],
})
export class AdminuserPage implements OnInit {

  users = [{
    nombre:"Sebastian",
    apellido:"Vargas",
    email: "sebas@sebas",
    password: "sebas"
  }, {
    nombre:"User2",
    apellido:"userap",
    email: "user@user",
    password: "user2"
  }];
  constructor(
    private modalController:ModalController
  ) { }

  ngOnInit() {
  }

async editUser(user){
  const modal = await this.modalController.create({
    component: ModalUserPage,
    componentProps: {
      'nombre': user.nombre,
      'apellido':user.apellido,
      'email':user.email,
      'password':user.password
    }
  });
  return await modal.present();
  }

}
