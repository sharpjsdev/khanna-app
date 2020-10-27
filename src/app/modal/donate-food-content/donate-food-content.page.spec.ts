import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonateFoodContentPage } from './donate-food-content.page';

describe('DonateFoodContentPage', () => {
  let component: DonateFoodContentPage;
  let fixture: ComponentFixture<DonateFoodContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateFoodContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonateFoodContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
