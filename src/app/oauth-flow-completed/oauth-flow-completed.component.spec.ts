import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OauthFlowCompletedComponent } from './oauth-flow-completed.component';

describe('OauthFlowCompletedComponent', () => {
  let component: OauthFlowCompletedComponent;
  let fixture: ComponentFixture<OauthFlowCompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OauthFlowCompletedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OauthFlowCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
