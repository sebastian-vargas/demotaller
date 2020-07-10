import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminwsPage } from './adminws.page';

describe('AdminwsPage', () => {
  let component: AdminwsPage;
  let fixture: ComponentFixture<AdminwsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminwsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminwsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
