import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsInListComponent } from './items-in-list.component';

describe('ItemsInListComponent', () => {
  let component: ItemsInListComponent;
  let fixture: ComponentFixture<ItemsInListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsInListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsInListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
