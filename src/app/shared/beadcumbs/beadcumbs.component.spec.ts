import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeadcumbsComponent } from './beadcumbs.component';

describe('BeadcumbsComponent', () => {
  let component: BeadcumbsComponent;
  let fixture: ComponentFixture<BeadcumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeadcumbsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeadcumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
