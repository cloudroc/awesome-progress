import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AwesomeProgressComponent } from './awesome-progress.component';

describe('AwesomeProgressComponent', () => {
  let component: AwesomeProgressComponent;
  let fixture: ComponentFixture<AwesomeProgressComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AwesomeProgressComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AwesomeProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
