import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VolunteerFoodRequestContentPage } from './volunteer-food-request-content.page';

describe('VolunteerFoodRequestContentPage', () => {
  let component: VolunteerFoodRequestContentPage;
  let fixture: ComponentFixture<VolunteerFoodRequestContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerFoodRequestContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VolunteerFoodRequestContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
