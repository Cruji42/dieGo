import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFavoriteEventComponent } from './list-favorite-event.component';

describe('ListFavoriteEventComponent', () => {
  let component: ListFavoriteEventComponent;
  let fixture: ComponentFixture<ListFavoriteEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListFavoriteEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFavoriteEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
