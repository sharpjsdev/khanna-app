import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SuccessDeliverModalPage } from './success-deliver-modal.page';

describe('SuccessDeliverModalPage', () => {
  let component: SuccessDeliverModalPage;
  let fixture: ComponentFixture<SuccessDeliverModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessDeliverModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessDeliverModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
