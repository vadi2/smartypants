import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LumcAuthorizeComponent } from './lumc-authorize.component';

describe('LumcAuthorizeComponent', () => {
  let component: LumcAuthorizeComponent;
  let fixture: ComponentFixture<LumcAuthorizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LumcAuthorizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LumcAuthorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
