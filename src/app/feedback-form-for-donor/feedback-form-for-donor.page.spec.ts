import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FeedbackFormForDonorPage } from './feedback-form-for-donor.page';

describe('FeedbackFormForDonorPage', () => {
  let component: FeedbackFormForDonorPage;
  let fixture: ComponentFixture<FeedbackFormForDonorPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedbackFormForDonorPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FeedbackFormForDonorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
