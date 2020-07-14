import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditlessonPage } from './editlesson.page';

describe('EditlessonPage', () => {
  let component: EditlessonPage;
  let fixture: ComponentFixture<EditlessonPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditlessonPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditlessonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
