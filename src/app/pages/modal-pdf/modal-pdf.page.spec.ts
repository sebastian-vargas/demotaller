import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalPdfPage } from './modal-pdf.page';

describe('ModalPdfPage', () => {
  let component: ModalPdfPage;
  let fixture: ComponentFixture<ModalPdfPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPdfPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPdfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
