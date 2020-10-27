import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetFoodSearchPage } from './get-food-search.page';

describe('GetFoodSearchPage', () => {
  let component: GetFoodSearchPage;
  let fixture: ComponentFixture<GetFoodSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetFoodSearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetFoodSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
