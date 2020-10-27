import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MobileNumberPage } from './mobile-number.page';

describe('MobileNumberPage', () => {
  let component: MobileNumberPage;
  let fixture: ComponentFixture<MobileNumberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileNumberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MobileNumberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
