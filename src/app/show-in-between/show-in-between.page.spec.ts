import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowInBetweenPage } from './show-in-between.page';

describe('ShowInBetweenPage', () => {
  let component: ShowInBetweenPage;
  let fixture: ComponentFixture<ShowInBetweenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowInBetweenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowInBetweenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
