import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { Operation, OperationType } from '../../../../shared/models/operation';
import { Asset } from '../../../../shared/models/asset';

@Component({
  selector: 'app-portfolio-operations-card',
  imports: [CommonModule, DecimalPipe, CurrencyPipe, DatePipe],
  templateUrl: './portfolio-operations-card.component.html',
  styleUrl: './portfolio-operations-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PortfolioOperationsCardComponent {
@Input() asset: Asset | null = null;
  @Input() currency: string = 'BRL';
  @Input() loading: boolean = false;

  @Output() operationClicked = new EventEmitter<Operation>();
  @Output() backClicked = new EventEmitter<void>();

  onOperationClick(operation: Operation): void {
    this.operationClicked.emit(operation);
  }

  onBackClick(): void {
    this.backClicked.emit();
  }

  getOperationsCount(): number {
    return this.asset?.operations?.length || 0;
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

  getOperationTypeClass(type: OperationType): string {
    switch (type) {
      case 'BUY':
        return 'operation-buy';
      case 'SELL':
        return 'operation-sell';
      case 'POSITION':
        return 'operation-position';
      default:
        return '';
    }
  }

  getOperationTypeIcon(type: OperationType): string {
    switch (type) {
      case 'BUY':
        return 'fa-arrow-down';
      case 'SELL':
        return 'fa-arrow-up';
      case 'POSITION':
        return 'fa-equals';
      default:
        return 'fa-exchange-alt';
    }
  }

  getOperationTypeBadgeClass(type: OperationType): string {
    switch (type) {
      case 'BUY':
        return 'bg-profit';
      case 'SELL':
        return 'bg-loss';
      case 'POSITION':
        return 'bg-secondary';
      default:
        return 'bg-secondary';
    }
  }

  calculateOperationTotal(operation: Operation): number {
    return operation.quantity * this.toNumber(operation.price);
  }

  formatDate(dateString: string): string {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  }

  trackByOperationIndex(index: number, operation: Operation): string {
    return `${operation.date}-${operation.type}-${index}`;
  }
}
