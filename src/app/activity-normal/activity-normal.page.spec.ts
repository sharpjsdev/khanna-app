import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ActivityNormalPage } from './activity-normal.page';

describe('ActivityNormalPage', () => {
  let component: ActivityNormalPage;
  let fixture: ComponentFixture<ActivityNormalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivityNormalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ActivityNormalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
