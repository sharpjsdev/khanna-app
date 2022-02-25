import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnTheWayAddressPage } from './on-the-way-address.page';

describe('OnTheWayAddressPage', () => {
  let component: OnTheWayAddressPage;
  let fixture: ComponentFixture<OnTheWayAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnTheWayAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnTheWayAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
