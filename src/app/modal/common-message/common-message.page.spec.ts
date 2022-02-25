import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommonMessagePage } from './common-message.page';

describe('CommonMessagePage', () => {
  let component: CommonMessagePage;
  let fixture: ComponentFixture<CommonMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonMessagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
