import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VolunteerRequestPage } from './volunteer-request.page';

describe('VolunteerRequestPage', () => {
  let component: VolunteerRequestPage;
  let fixture: ComponentFixture<VolunteerRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerRequestPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VolunteerRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
