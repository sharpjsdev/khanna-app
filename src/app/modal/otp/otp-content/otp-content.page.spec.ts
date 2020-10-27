import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtpContentPage } from './otp-content.page';

describe('OtpContentPage', () => {
  let component: OtpContentPage;
  let fixture: ComponentFixture<OtpContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtpContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtpContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
