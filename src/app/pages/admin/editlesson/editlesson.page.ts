import { Component, OnInit } from '@angular/core';
import { workshops } from "../../../services/data";
import { ActionSheetController, NavController, ModalController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { ModalWsPage } from '../modal-ws/modal-ws.page';
@Component({
  selector: 'app-editlesson',
  templateUrl: './editlesson.page.html',
  styleUrls: ['./editlesson.page.scss'],
})
export class EditlessonPage implements OnInit {

  constructor(
    public actionSheetController: ActionSheetController,
    private navCtrl:NavController,
    private route: ActivatedRoute,
    private modalController:ModalController
  ) { }

  workshop = {
    id: 0,
    title: "Magia de amor",
    description: ""
  };

  ngOnInit() {

    let id = Number(this.route.snapshot.paramMap.get("id"));

    let workshop = workshops.find(workshop => workshop.id == id);
    
    if(workshop != undefined){
      this.workshop = workshop;
    }else {
      this.navCtrl.navigateRoot('menu/tabs/home');
    }
  }

  async editLS(lesson){
    const modal = await this.modalController.create({
      component: ModalWsPage,
      componentProps: {
        'titulo': lesson.name,
        'descripcion':lesson.description,
        'pdfUrl':lesson.video,
        'vidUrl':lesson.pdfs.url
      }
    });
    return await modal.present();
    }

  navigate(id){
    this.navCtrl.navigateForward(`menu/admin/adminws/${this.workshop.id}/lesson/${id}`);
  }
}
