import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterContentPage } from './filter-content.page';

describe('FilterContentPage', () => {
  let component: FilterContentPage;
  let fixture: ComponentFixture<FilterContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterContentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
