import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserRegPage } from './user-reg.page';

describe('UserRegPage', () => {
  let component: UserRegPage;
  let fixture: ComponentFixture<UserRegPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserRegPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserRegPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
