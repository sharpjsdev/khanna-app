import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomeContentPage } from './home-content.page';

describe('HomeContentPage', () => {
  let component: HomeContentPage;
  let fixture: ComponentFixture<HomeContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomeContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
