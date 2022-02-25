import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommonSearchScreenPage } from './common-search-screen.page';

describe('CommonSearchScreenPage', () => {
  let component: CommonSearchScreenPage;
  let fixture: ComponentFixture<CommonSearchScreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSearchScreenPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CommonSearchScreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
