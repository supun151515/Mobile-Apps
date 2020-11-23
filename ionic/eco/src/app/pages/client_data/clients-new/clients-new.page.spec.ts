import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientsNewPage } from './clients-new.page';

describe('ClientsNewPage', () => {
  let component: ClientsNewPage;
  let fixture: ComponentFixture<ClientsNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientsNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientsNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
