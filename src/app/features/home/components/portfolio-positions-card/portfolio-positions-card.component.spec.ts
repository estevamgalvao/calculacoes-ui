import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortfolioPositionsCardComponent } from './portfolio-positions-card.component';

describe('PortfolioPositionsCardComponent', () => {
  let component: PortfolioPositionsCardComponent;
  let fixture: ComponentFixture<PortfolioPositionsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PortfolioPositionsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortfolioPositionsCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
