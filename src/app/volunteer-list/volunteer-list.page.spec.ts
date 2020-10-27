import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VolunteerListPage } from './volunteer-list.page';

describe('VolunteerListPage', () => {
  let component: VolunteerListPage;
  let fixture: ComponentFixture<VolunteerListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerListPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VolunteerListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
