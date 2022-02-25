import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OnTheWaySearchPage } from './on-the-way-search.page';

describe('OnTheWaySearchPage', () => {
  let component: OnTheWaySearchPage;
  let fixture: ComponentFixture<OnTheWaySearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnTheWaySearchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OnTheWaySearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
