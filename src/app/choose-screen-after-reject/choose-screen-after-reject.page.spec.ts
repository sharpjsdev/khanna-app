import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseScreenAfterRejectPage } from './choose-screen-after-reject.page';

describe('ChooseScreenAfterRejectPage', () => {
  let component: ChooseScreenAfterRejectPage;
  let fixture: ComponentFixture<ChooseScreenAfterRejectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseScreenAfterRejectPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseScreenAfterRejectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
