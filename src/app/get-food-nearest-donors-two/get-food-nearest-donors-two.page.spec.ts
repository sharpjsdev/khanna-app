import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetFoodNearestDonorsTwoPage } from './get-food-nearest-donors-two.page';

describe('GetFoodNearestDonorsTwoPage', () => {
  let component: GetFoodNearestDonorsTwoPage;
  let fixture: ComponentFixture<GetFoodNearestDonorsTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFoodNearestDonorsTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetFoodNearestDonorsTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
