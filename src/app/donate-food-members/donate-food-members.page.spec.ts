import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DonateFoodMembersPage } from './donate-food-members.page';

describe('DonateFoodMembersPage', () => {
  let component: DonateFoodMembersPage;
  let fixture: ComponentFixture<DonateFoodMembersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonateFoodMembersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DonateFoodMembersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
