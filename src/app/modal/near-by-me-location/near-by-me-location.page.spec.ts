import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NearByMeLocationPage } from './near-by-me-location.page';

describe('NearByMeLocationPage', () => {
  let component: NearByMeLocationPage;
  let fixture: ComponentFixture<NearByMeLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearByMeLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NearByMeLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
