import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NearestDonorsPage } from './nearest-donors.page';

describe('NearestDonorsPage', () => {
  let component: NearestDonorsPage;
  let fixture: ComponentFixture<NearestDonorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearestDonorsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NearestDonorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
