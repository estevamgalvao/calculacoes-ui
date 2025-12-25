import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';
import { Asset } from '../../../../shared/models/asset';
import { PortfolioSummary } from '../../../../shared/models/portfolio-summary';

@Component({
  selector: 'app-portfolio-positions-card',
  imports: [CommonModule, DecimalPipe, CurrencyPipe],
  templateUrl: './portfolio-positions-card.component.html',
  styleUrl: './portfolio-positions-card.component.scss',
})
export class PortfolioPositionsCardComponent {
  @Input() portfolioSummary: PortfolioSummary | null = null;
  @Input() currency: string = 'BRL';
  @Input() loading: boolean = false;

  @Output() assetClicked = new EventEmitter<Asset>();
  @Output() closeClicked = new EventEmitter<void>();

/*   ngOnChanges(changes: SimpleChanges): void {
    console.log('[PortfolioPositionsCard] ngOnChanges', changes);
  } */

  onAssetClick(asset: Asset): void {
    this.assetClicked.emit(asset);
  }

  onCloseClick(): void {
    console.log('Close button clicked');
    this.closeClicked.emit();
  }

  getPositionsCount(): number {
    return this.portfolioSummary?.positions?.length || 0;
  }

  // Convert string to number for calculations
  toNumber(value: string): number {
    return parseFloat(value) || 0;
  }

  isProfitable(value: string): boolean {
    return this.toNumber(value) > 0;
  }

  isLoss(value: string): boolean {
    return this.toNumber(value) < 0;
  }

  getProfitLossClass(value: string): string {
    const numValue = this.toNumber(value);
    if (numValue > 0) return 'profit';
    if (numValue < 0) return 'loss';
    return 'neutral';
  }

  getProfitLossIcon(value: string): string {
    const numValue = this.toNumber(value);
    if (numValue > 0) return 'fa-arrow-up';
    if (numValue < 0) return 'fa-arrow-down';
    return 'fa-minus';
  }

  formatPercentage(profitLoss: string, totalValue: string): string {
    const plNum = this.toNumber(profitLoss);
    const tvNum = this.toNumber(totalValue);
    
    if (tvNum === 0 || plNum === 0) return '0.00';
    
    // Calculate percentage: (P&L / (Total Value - P&L)) * 100
    const invested = tvNum - plNum;
    if (invested === 0) return '0.00';
    
    const percentage = (plNum / invested) * 100;
    return Math.abs(percentage).toFixed(2);
  }

  getOperationsCount(asset: Asset): number {
    return asset.operations?.length || 0;
  }

  trackByAssetCode(index: number, asset: Asset): string {
    return asset.tradingCode || index.toString();
  }
}
