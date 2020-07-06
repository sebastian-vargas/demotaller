import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-workshop',
  templateUrl: './list-workshop.page.html',
  styleUrls: ['./list-workshop.page.scss'],
})
export class ListWorkshopPage implements OnInit {

  lessons = [{
    nombre:"leccion1",
    descripcion: "descripcion leccion 1"
  }, {
    nombre:"leccion2",
    descripcion: "descripcion leccion 2"
  }];
  constructor() { }

  ngOnInit() {
  }

}
