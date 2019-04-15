import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowTweetModalComponent } from './show-tweet-modal.component';

describe('ShowTweetModalComponent', () => {
  let component: ShowTweetModalComponent;
  let fixture: ComponentFixture<ShowTweetModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowTweetModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowTweetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
