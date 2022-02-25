import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DynamicMsgPage } from './dynamic-msg.page';

describe('DynamicMsgPage', () => {
  let component: DynamicMsgPage;
  let fixture: ComponentFixture<DynamicMsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicMsgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicMsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
