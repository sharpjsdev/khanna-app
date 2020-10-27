import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonateFoodReviewPage } from './donate-food-review.page';

describe('DonateFoodReviewPage', () => {
  let component: DonateFoodReviewPage;
  let fixture: ComponentFixture<DonateFoodReviewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateFoodReviewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonateFoodReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
