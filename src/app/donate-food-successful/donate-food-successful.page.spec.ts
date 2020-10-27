import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonateFoodSuccessfulPage } from './donate-food-successful.page';

describe('DonateFoodSuccessfulPage', () => {
  let component: DonateFoodSuccessfulPage;
  let fixture: ComponentFixture<DonateFoodSuccessfulPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateFoodSuccessfulPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonateFoodSuccessfulPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
