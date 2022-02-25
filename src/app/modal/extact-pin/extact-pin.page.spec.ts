import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ExtactPinPage } from './extact-pin.page';

describe('ExtactPinPage', () => {
  let component: ExtactPinPage;
  let fixture: ComponentFixture<ExtactPinPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtactPinPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ExtactPinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
