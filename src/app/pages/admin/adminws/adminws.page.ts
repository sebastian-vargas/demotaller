import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ModalWsPage } from '../modal-ws/modal-ws.page';



@Component({
  selector: 'app-adminws',
  templateUrl: './adminws.page.html',
  styleUrls: ['./adminws.page.scss'],
})
export class AdminwsPage  implements OnInit {
  workshops = [{
    titulo:"Camino a la prosperidad",
    descripcion:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran",
    pdfUrl:"URLPDFCAMINOPROSPERIDAD",
    vidUrl:"URLVIDCAMINOPROSPERIDAD",
    readed: false
  }, {
    titulo:"Aprendiendo a vivir",
    descripcion:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran",
    pdfUrl:"URLPDFAPRENDIENDOAVIVIR2",
    vidUrl:"URLVIDAPRENDIENDOAVIVIR2",
    readed: true
  },{
    titulo:"Aprendiendo a vivir",
    descripcion:"Describir es explicar, de manera detallada y ordenada, cómo son las personas, animales, lugares, objetos, etc. La descripción sirve sobre todo para ambientar la acción y crear una que haga más creíbles los hechos que se narran",
    pdfUrl:"URLPDFAPRENDIENDOAVIVIR2",
    vidUrl:"URLVIDAPRENDIENDOAVIVIR2",
    readed: false
  }];
  
  constructor(
    private modalController:ModalController,
    private navCtrl:NavController
  ) { }

  ngOnInit() {
  }
  navigate(url){
    this.navCtrl.navigateForward(`menu/admin/${url}`);
  }

  async editWS(w){
    const modal = await this.modalController.create({
      component: ModalWsPage,
      componentProps: {
        'titulo': w.titulo,
        'descripcion':w.descripcion,
        'pdfUrl':w.pdfUrl,
        'vidUrl':w.vidUrl
      }
    });
    return await modal.present();
    }
}