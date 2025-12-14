import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioOperationsCardComponent } from './portfolio-operations-card.component';

describe('PortfolioOperationsCardComponent', () => {
  let component: PortfolioOperationsCardComponent;
  let fixture: ComponentFixture<PortfolioOperationsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioOperationsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioOperationsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
