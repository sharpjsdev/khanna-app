import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavedAddressesEditPage } from './saved-addresses-edit.page';

describe('SavedAddressesEditPage', () => {
  let component: SavedAddressesEditPage;
  let fixture: ComponentFixture<SavedAddressesEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedAddressesEditPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavedAddressesEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
