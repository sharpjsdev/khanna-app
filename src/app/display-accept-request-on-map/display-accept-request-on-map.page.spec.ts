import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DisplayAcceptRequestOnMapPage } from './display-accept-request-on-map.page';

describe('DisplayAcceptRequestOnMapPage', () => {
  let component: DisplayAcceptRequestOnMapPage;
  let fixture: ComponentFixture<DisplayAcceptRequestOnMapPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayAcceptRequestOnMapPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DisplayAcceptRequestOnMapPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
