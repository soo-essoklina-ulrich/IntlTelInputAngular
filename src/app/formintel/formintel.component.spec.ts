import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormintelComponent } from './formintel.component';

describe('FormintelComponent', () => {
  let component: FormintelComponent;
  let fixture: ComponentFixture<FormintelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormintelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormintelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
