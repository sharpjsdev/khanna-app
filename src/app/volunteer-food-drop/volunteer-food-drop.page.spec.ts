import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VolunteerFoodDropPage } from './volunteer-food-drop.page';

describe('VolunteerFoodDropPage', () => {
  let component: VolunteerFoodDropPage;
  let fixture: ComponentFixture<VolunteerFoodDropPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerFoodDropPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VolunteerFoodDropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
