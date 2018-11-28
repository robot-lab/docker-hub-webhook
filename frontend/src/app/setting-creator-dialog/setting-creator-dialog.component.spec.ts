import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingCreatorDialog } from './setting-creator-dialog.component';

describe('SettingCreatorDialog', () => {
  let component: SettingCreatorDialog;
  let fixture: ComponentFixture<SettingCreatorDialog>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingCreatorDialog ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingCreatorDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
