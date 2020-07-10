import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalWsPage } from './modal-ws.page';

describe('ModalWsPage', () => {
  let component: ModalWsPage;
  let fixture: ComponentFixture<ModalWsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalWsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
