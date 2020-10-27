import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LocationErrorContentPage } from './location-error-content.page';

describe('LocationErrorContentPage', () => {
  let component: LocationErrorContentPage;
  let fixture: ComponentFixture<LocationErrorContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationErrorContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LocationErrorContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
