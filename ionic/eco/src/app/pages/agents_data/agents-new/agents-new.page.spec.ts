import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgentsNewPage } from './agents-new.page';

describe('AgentsNewPage', () => {
  let component: AgentsNewPage;
  let fixture: ComponentFixture<AgentsNewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentsNewPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgentsNewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
