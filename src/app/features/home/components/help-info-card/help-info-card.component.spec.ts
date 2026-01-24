import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HelpInfoCardComponent } from './help-info-card.component';

describe('HelpInfoCardComponent', () => {
  let component: HelpInfoCardComponent;
  let fixture: ComponentFixture<HelpInfoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HelpInfoCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HelpInfoCardComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
