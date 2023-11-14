import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyteamsPage } from './myteams.page';

describe('MyteamsPage', () => {
  let component: MyteamsPage;
  let fixture: ComponentFixture<MyteamsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MyteamsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
