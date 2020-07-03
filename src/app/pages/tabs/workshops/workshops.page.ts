import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workshops',
  templateUrl: './workshops.page.html',
  styleUrls: ['./workshops.page.scss'],
})
export class WorkshopsPage implements OnInit {
  workshops = [{}, {}, {},{},{},{},{}];
  constructor() { }

  ngOnInit() {
  }

}
