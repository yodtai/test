import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReorderingListComponent } from './reordering-list.component';

describe('ReorderingListComponent', () => {
  let component: ReorderingListComponent;
  let fixture: ComponentFixture<ReorderingListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReorderingListComponent]
    });
    fixture = TestBed.createComponent(ReorderingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
