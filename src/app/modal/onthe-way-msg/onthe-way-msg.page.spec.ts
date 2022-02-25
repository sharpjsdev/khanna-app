import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OntheWayMsgPage } from './onthe-way-msg.page';

describe('OntheWayMsgPage', () => {
  let component: OntheWayMsgPage;
  let fixture: ComponentFixture<OntheWayMsgPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OntheWayMsgPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OntheWayMsgPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
