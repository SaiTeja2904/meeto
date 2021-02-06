import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodePlatformComponent } from './code-platform.component';

describe('CodePlatformComponent', () => {
  let component: CodePlatformComponent;
  let fixture: ComponentFixture<CodePlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodePlatformComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodePlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
