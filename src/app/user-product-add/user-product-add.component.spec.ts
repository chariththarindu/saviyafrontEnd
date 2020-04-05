import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductAddComponent } from './user-product-add.component';

describe('UserProductAddComponent', () => {
  let component: UserProductAddComponent;
  let fixture: ComponentFixture<UserProductAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
