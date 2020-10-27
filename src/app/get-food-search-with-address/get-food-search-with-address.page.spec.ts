import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetFoodSearchWithAddressPage } from './get-food-search-with-address.page';

describe('GetFoodSearchWithAddressPage', () => {
  let component: GetFoodSearchWithAddressPage;
  let fixture: ComponentFixture<GetFoodSearchWithAddressPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFoodSearchWithAddressPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetFoodSearchWithAddressPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
