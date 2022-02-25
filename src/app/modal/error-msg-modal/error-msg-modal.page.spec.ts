import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ErrorMsgModalPage } from './error-msg-modal.page';

describe('ErrorMsgModalPage', () => {
  let component: ErrorMsgModalPage;
  let fixture: ComponentFixture<ErrorMsgModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorMsgModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMsgModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
