import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetFoodNearestDonorsTwoDuplicatePage } from './get-food-nearest-donors-two-duplicate.page';

describe('GetFoodNearestDonorsTwoDuplicatePage', () => {
  let component: GetFoodNearestDonorsTwoDuplicatePage;
  let fixture: ComponentFixture<GetFoodNearestDonorsTwoDuplicatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFoodNearestDonorsTwoDuplicatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetFoodNearestDonorsTwoDuplicatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
