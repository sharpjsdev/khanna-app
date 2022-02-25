import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RejectGetFoodRequestPage } from './reject-get-food-request.page';

describe('RejectGetFoodRequestPage', () => {
  let component: RejectGetFoodRequestPage;
  let fixture: ComponentFixture<RejectGetFoodRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectGetFoodRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RejectGetFoodRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
