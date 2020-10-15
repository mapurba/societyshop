import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostPhotosToblogComponent } from './post-photos-toblog.component';

describe('PostPhotosToblogComponent', () => {
  let component: PostPhotosToblogComponent;
  let fixture: ComponentFixture<PostPhotosToblogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostPhotosToblogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostPhotosToblogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
