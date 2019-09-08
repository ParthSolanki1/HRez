import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatCardsComponent } from './chat-cards.component';

describe('ChatCardsComponent', () => {
  let component: ChatCardsComponent;
  let fixture: ComponentFixture<ChatCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
