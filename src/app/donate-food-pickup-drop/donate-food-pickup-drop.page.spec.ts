import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonateFoodPickupDropPage } from './donate-food-pickup-drop.page';

describe('DonateFoodPickupDropPage', () => {
  let component: DonateFoodPickupDropPage;
  let fixture: ComponentFixture<DonateFoodPickupDropPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateFoodPickupDropPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonateFoodPickupDropPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
