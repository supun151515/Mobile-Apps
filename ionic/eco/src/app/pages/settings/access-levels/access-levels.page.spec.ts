import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AccessLevelsPage } from './access-levels.page';

describe('AccessLevelsPage', () => {
  let component: AccessLevelsPage;
  let fixture: ComponentFixture<AccessLevelsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessLevelsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AccessLevelsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
