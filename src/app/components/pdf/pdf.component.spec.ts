import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PdfComponent } from './pdf.component';

describe('PdfComponent', () => {
  let component: PdfComponent;
  let fixture: ComponentFixture<PdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
