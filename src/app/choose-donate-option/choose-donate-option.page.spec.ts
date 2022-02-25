import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseDonateOptionPage } from './choose-donate-option.page';

describe('ChooseDonateOptionPage', () => {
  let component: ChooseDonateOptionPage;
  let fixture: ComponentFixture<ChooseDonateOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseDonateOptionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseDonateOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
