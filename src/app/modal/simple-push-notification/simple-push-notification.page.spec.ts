import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SimplePushNotificationPage } from './simple-push-notification.page';

describe('SimplePushNotificationPage', () => {
  let component: SimplePushNotificationPage;
  let fixture: ComponentFixture<SimplePushNotificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplePushNotificationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SimplePushNotificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
