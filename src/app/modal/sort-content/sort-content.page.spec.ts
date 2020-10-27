import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SortContentPage } from './sort-content.page';

describe('SortContentPage', () => {
  let component: SortContentPage;
  let fixture: ComponentFixture<SortContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SortContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
