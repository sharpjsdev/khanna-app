import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ConertToPickupSuccessPage } from './conert-to-pickup-success.page';

describe('ConertToPickupSuccessPage', () => {
  let component: ConertToPickupSuccessPage;
  let fixture: ComponentFixture<ConertToPickupSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConertToPickupSuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ConertToPickupSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
