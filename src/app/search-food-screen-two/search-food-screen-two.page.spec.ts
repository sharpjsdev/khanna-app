import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchFoodScreenTwoPage } from './search-food-screen-two.page';

describe('SearchFoodScreenTwoPage', () => {
  let component: SearchFoodScreenTwoPage;
  let fixture: ComponentFixture<SearchFoodScreenTwoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchFoodScreenTwoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFoodScreenTwoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
