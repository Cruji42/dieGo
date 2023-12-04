import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrganizerEventComponent } from './list-organizer-event.component';

describe('ListOrganizerEventComponent', () => {
  let component: ListOrganizerEventComponent;
  let fixture: ComponentFixture<ListOrganizerEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrganizerEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrganizerEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
