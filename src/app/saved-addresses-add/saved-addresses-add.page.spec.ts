import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SavedAddressesAddPage } from './saved-addresses-add.page';

describe('SavedAddressesAddPage', () => {
  let component: SavedAddressesAddPage;
  let fixture: ComponentFixture<SavedAddressesAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavedAddressesAddPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SavedAddressesAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
