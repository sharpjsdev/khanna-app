import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DeliverFoodVolunteerPage } from './deliver-food-volunteer.page';

describe('DeliverFoodVolunteerPage', () => {
  let component: DeliverFoodVolunteerPage;
  let fixture: ComponentFixture<DeliverFoodVolunteerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliverFoodVolunteerPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DeliverFoodVolunteerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
