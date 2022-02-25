import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonateLaterMsgPage } from './donate-later-msg.page';

describe('DonateLaterMsgPage', () => {
  let component: DonateLaterMsgPage;
  let fixture: ComponentFixture<DonateLaterMsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateLaterMsgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonateLaterMsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
