import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddwsPage } from './addws.page';

describe('AddwsPage', () => {
  let component: AddwsPage;
  let fixture: ComponentFixture<AddwsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddwsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddwsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
