import { Component } from '@angular/core';
import { HeaderBarComponent, MenuItem } from '../../components/header-bar/header-bar.component';
import { PortfolioPositionsCardComponent } from '../../components/portfolio-positions-card/portfolio-positions-card.component';
import { PortfolioSummary } from '../../../../shared/models/portfolio-summary';
import { Asset } from '../../../../shared/models/asset';
import { PortfolioOperationsCardComponent } from '../../components/portfolio-operations-card/portfolio-operations-card.component';
import { Operation } from '../../../../shared/models/operation';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test',
  imports: [PortfolioPositionsCardComponent, PortfolioOperationsCardComponent, CommonModule],
  templateUrl: './test.page.html',
  styleUrl: './test.page.scss',
})
export class TestPage {
isLoading = false;
  isLoadingOperations = false;
  selectedAsset: Asset | null = null;

  portfolioData = {
    totalInvested: '50000.00',
    totalRealizedProfitLoss: '5420.50',
    positions: [
      {
        name: 'Petrobras PN',
        tradingCode: 'PETR4',
        institution: 'Clear Corretora',
        quantity: 100,
        averagePrice: '28.50',
        totalValue: '3200.00',
        realizedProfitLoss: '350.00',
        operations: [
          {
            date: '2024-01-15',
            assetCode: 'PETR4',
            type: 'BUY' as const,
            marketType: 'VISTA',
            quantity: 50,
            price: '27.80'
          },
          {
            date: '2024-02-20',
            assetCode: 'PETR4',
            type: 'BUY' as const,
            marketType: 'VISTA',
            quantity: 50,
            price: '29.20'
          },
          {
            date: '2024-03-10',
            assetCode: 'PETR4',
            type: 'SELL' as const,
            marketType: 'VISTA',
            quantity: 20,
            price: '32.00'
          }
        ]
      }
    ]
  };

  onAssetClicked(asset: Asset): void {
    console.log('Asset clicked:', asset);
    this.selectedAsset = asset;
  }

  onOperationClicked(operation: Operation): void {
    console.log('Operation clicked:', operation);
    // Open modal with operation details or navigate
  }

  onBackClicked(): void {
    this.selectedAsset = null;
  }
}
