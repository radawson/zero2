import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OutbreakComponent } from './outbreak.component';

describe('OutbreakComponent', () => {
  let component: OutbreakComponent;
  let fixture: ComponentFixture<OutbreakComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ OutbreakComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OutbreakComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
