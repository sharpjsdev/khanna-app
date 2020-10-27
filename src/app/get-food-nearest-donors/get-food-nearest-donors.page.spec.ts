import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetFoodNearestDonorsPage } from './get-food-nearest-donors.page';

describe('GetFoodNearestDonorsPage', () => {
  let component: GetFoodNearestDonorsPage;
  let fixture: ComponentFixture<GetFoodNearestDonorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFoodNearestDonorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetFoodNearestDonorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
