import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrentLocationContentPage } from './current-location-content.page';

describe('CurrentLocationContentPage', () => {
  let component: CurrentLocationContentPage;
  let fixture: ComponentFixture<CurrentLocationContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentLocationContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentLocationContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
