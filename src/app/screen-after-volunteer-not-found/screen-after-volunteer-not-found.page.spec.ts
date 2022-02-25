import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ScreenAfterVolunteerNotFoundPage } from './screen-after-volunteer-not-found.page';

describe('ScreenAfterVolunteerNotFoundPage', () => {
  let component: ScreenAfterVolunteerNotFoundPage;
  let fixture: ComponentFixture<ScreenAfterVolunteerNotFoundPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScreenAfterVolunteerNotFoundPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ScreenAfterVolunteerNotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
