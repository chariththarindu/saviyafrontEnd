import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserProductEditComponent } from './user-product-edit.component';

describe('UserProductEditComponent', () => {
  let component: UserProductEditComponent;
  let fixture: ComponentFixture<UserProductEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserProductEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProductEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
