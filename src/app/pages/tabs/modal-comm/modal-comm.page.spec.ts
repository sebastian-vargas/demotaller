import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalCommPage } from './modal-comm.page';

describe('ModalCommPage', () => {
  let component: ModalCommPage;
  let fixture: ComponentFixture<ModalCommPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCommPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCommPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
