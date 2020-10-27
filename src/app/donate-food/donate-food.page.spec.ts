import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonateFoodPage } from './donate-food.page';

describe('DonateFoodPage', () => {
  let component: DonateFoodPage;
  let fixture: ComponentFixture<DonateFoodPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateFoodPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonateFoodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
