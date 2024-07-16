import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsesoriasPage } from './asesorias.page';

describe('AsesoriasPage', () => {
  let component: AsesoriasPage;
  let fixture: ComponentFixture<AsesoriasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsesoriasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
