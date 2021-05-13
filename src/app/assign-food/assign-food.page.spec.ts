import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AssignFoodPage } from './assign-food.page';

describe('AssignFoodPage', () => {
  let component: AssignFoodPage;
  let fixture: ComponentFixture<AssignFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignFoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AssignFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
