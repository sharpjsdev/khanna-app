import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChooseLanguagePage } from './choose-language.page';

describe('ChooseLanguagePage', () => {
  let component: ChooseLanguagePage;
  let fixture: ComponentFixture<ChooseLanguagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseLanguagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChooseLanguagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
