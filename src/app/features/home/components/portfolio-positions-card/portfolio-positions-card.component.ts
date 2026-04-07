// portfolio-positions-card.component.ts
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { CommonModule, DecimalPipe, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Asset } from '../../../../shared/models/asset';
import { PortfolioSummary } from '../../../../shared/models/portfolio-summary';

export type SortField = 'quantity' | 'totalValue' | 'averagePrice' | 'realizedProfitLoss' | 'operations';

export interface FilterState {
  searchText: string;
  hideZeroQuantity: boolean;
  onlyProfit: boolean;
  onlyLoss: boolean;
  onlyFunds: boolean;
  onlyStocks: boolean;
  sortBy: SortField;
  sortDirection: 'asc' | 'desc';
}

@Component({
  selector: 'app-portfolio-positions-card',
  imports: [
    CommonModule, 
    DecimalPipe, 
    CurrencyPipe, 
    FormsModule
  ],
  templateUrl: './portfolio-positions-card.component.html',
  styleUrl: './portfolio-positions-card.component.scss',
})
export class PortfolioPositionsCardComponent implements OnChanges {
  @Input() portfolioSummary: PortfolioSummary | null = null;
  @Input() currency: string = 'BRL';
  @Input() loading: boolean = false;

  @Output() assetClicked = new EventEmitter<Asset>();
  @Output() closeClicked = new EventEmitter<void>();

  // ─── Internal derived state (never mutates the @Input) ───────────────────
  displayedPositions: Asset[] = [];

  filterState: FilterState = {
    searchText: '',
    hideZeroQuantity: false,
    onlyProfit: false,
    onlyLoss: false,
    onlyFunds: false,
    onlyStocks: false,
    sortBy: 'totalValue',
    sortDirection: 'desc'
  };

  readonly sortOptions: { value: SortField; label: string }[] = [
    { value: 'totalValue',         label: 'Valor Total' },
    { value: 'quantity',           label: 'Quantidade' },
    { value: 'averagePrice',       label: 'Preço Médio' },
    { value: 'realizedProfitLoss', label: 'P&L Realizado' },
    { value: 'operations',         label: 'Nº Operações' }
  ];

  // ─── Lifecycle ────────────────────────────────────────────────────────────
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['portfolioSummary']) {
      this.applyFilters();
    }
  }

  // ─── Core filter engine ───────────────────────────────────────────────────
  applyFilters(): void {
    const positions = this.portfolioSummary?.positions ?? [];
    const { searchText, hideZeroQuantity, onlyProfit, onlyLoss, onlyFunds, onlyStocks, sortBy, sortDirection } = this.filterState;

    let result = [...positions]; // shallow copy — never mutates the input

    // 1. Search by name or trading code
    if (searchText.trim()) {
      const term = searchText.trim().toLowerCase();
      result = result.filter(a =>
        a.name?.toLowerCase().includes(term) ||
        a.tradingCode?.toLowerCase().includes(term)
      );
    }

    // 2. Hide zero quantity positions
    if (hideZeroQuantity) {
      result = result.filter(a => a.quantity !== 0);
    }

    // 3. P&L filters (mutually exclusive)
    if (onlyProfit) {
      result = result.filter(a => this.toNumber(a.realizedProfitLoss) > 0);
    } else if (onlyLoss) {
      result = result.filter(a => this.toNumber(a.realizedProfitLoss) < 0);
    }

    // 4. Asset type filters (mutually exclusive)
    if (onlyFunds) {
      result = result.filter(a => this.isFund(a.tradingCode));
    } else if (onlyStocks) {
      result = result.filter(a => this.isStock(a.tradingCode));
    }

    // 5. Sort
    result.sort((a, b) => {
      let valA: number;
      let valB: number;

      switch (sortBy) {
        case 'quantity':
          valA = a.quantity ?? 0;
          valB = b.quantity ?? 0;
          break;
        case 'totalValue':
          valA = this.toNumber(a.totalValue);
          valB = this.toNumber(b.totalValue);
          break;
        case 'averagePrice':
          valA = this.toNumber(a.averagePrice);
          valB = this.toNumber(b.averagePrice);
          break;
        case 'realizedProfitLoss':
          valA = this.toNumber(a.realizedProfitLoss);
          valB = this.toNumber(b.realizedProfitLoss);
          break;
        case 'operations':
          valA = a.operations?.length ?? 0;
          valB = b.operations?.length ?? 0;
          break;
        default:
          return 0;
      }

      return sortDirection === 'asc' ? valA - valB : valB - valA;
    });

    this.displayedPositions = result;
  }

  // ─── Filter event handlers ────────────────────────────────────────────────

  onSearchChange(): void {
    this.applyFilters();
  }

  onFilterChange(changed: 'onlyProfit' | 'onlyLoss' | 'onlyFunds' | 'onlyStocks'): void {
    // Enforce mutual exclusion
    if (changed === 'onlyProfit' && this.filterState.onlyProfit) {
      this.filterState.onlyLoss = false;
    }
    if (changed === 'onlyLoss' && this.filterState.onlyLoss) {
      this.filterState.onlyProfit = false;
    }
    if (changed === 'onlyFunds' && this.filterState.onlyFunds) {
      this.filterState.onlyStocks = false;
    }
    if (changed === 'onlyStocks' && this.filterState.onlyStocks) {
      this.filterState.onlyFunds = false;
    }
    this.applyFilters();
  }

  onSortChange(): void {
    this.applyFilters();
  }

  toggleSortDirection(): void {
    this.filterState.sortDirection = this.filterState.sortDirection === 'asc' ? 'desc' : 'asc';
    this.applyFilters();
  }

  resetFilters(): void {
    this.filterState = {
      searchText: '',
      hideZeroQuantity: false,
      onlyProfit: false,
      onlyLoss: false,
      onlyFunds: false,
      onlyStocks: false,
      sortBy: 'totalValue',
      sortDirection: 'desc'
    };
    this.applyFilters();
  }

  // ─── Template helpers ─────────────────────────────────────────────────────

  isFilterActive(): boolean {
    const f = this.filterState;
    return (
      f.searchText.trim() !== '' ||
      f.hideZeroQuantity ||
      f.onlyProfit ||
      f.onlyLoss ||
      f.onlyFunds ||
      f.onlyStocks ||
      f.sortBy !== 'totalValue' ||
      f.sortDirection !== 'desc'
    );
  }

  isFund(tradingCode: string): boolean {
    // Funds: ticker ends with 11 (e.g. MCHF11, KNRI11)
    return /11$/.test(tradingCode ?? '');
  }

  isStock(tradingCode: string): boolean {
    // Stocks: ticker ends with 3 or 4 (e.g. GOAU4, VALE3)
    return /[34]F?$/.test(tradingCode ?? '');
  }

  getPositionsCount(): number {
    return this.portfolioSummary?.positions?.length ?? 0;
  }

  getDisplayedCount(): number {
    return this.displayedPositions.length;
  }

  onAssetClick(asset: Asset): void {
    this.assetClicked.emit(asset);
  }

  onCloseClick(): void {
    this.closeClicked.emit();
  }

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
    const n = this.toNumber(value);
    if (n > 0) return 'profit';
    if (n < 0) return 'loss';
    return 'neutral';
  }

  getProfitLossIcon(value: string): string {
    const n = this.toNumber(value);
    if (n > 0) return 'fa-arrow-up';
    if (n < 0) return 'fa-arrow-down';
    return 'fa-minus';
  }

  getOperationsCount(asset: Asset): number {
    return asset.operations?.length ?? 0;
  }

  trackByAssetCode(index: number, asset: Asset): string {
    return asset.tradingCode || index.toString();
  }
}