import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoWorkshopPage } from './do-workshop.page';

describe('DoWorkshopPage', () => {
  let component: DoWorkshopPage;
  let fixture: ComponentFixture<DoWorkshopPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoWorkshopPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoWorkshopPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
