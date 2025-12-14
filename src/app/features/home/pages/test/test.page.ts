import { Component } from '@angular/core';
import { HeaderBarComponent, MenuItem } from '../../components/header-bar/header-bar.component';
import { PortfolioPositionsCardComponent } from '../../components/portfolio-positions-card/portfolio-positions-card.component';
import { PortfolioSummary } from '../../../../shared/models/portfolio-summary';
import { Asset } from '../../../../shared/models/asset';

@Component({
  selector: 'app-test',
  imports: [PortfolioPositionsCardComponent],
  templateUrl: './test.page.html',
  styleUrl: './test.page.scss',
})
export class TestPage {
  isLoading = false;

  portfolioData: PortfolioSummary = {
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
            type: 'BUY',
            marketType: 'VISTA',
            quantity: 100,
            price: '28.50'
          }
        ]
      },
      {
        name: 'Vale ON',
        tradingCode: 'VALE3',
        institution: 'XP Investimentos',
        quantity: 50,
        averagePrice: '65.20',
        totalValue: '3400.00',
        realizedProfitLoss: '-140.00',
        operations: [
          {
            date: '2024-02-10',
            assetCode: 'VALE3',
            type: 'BUY',
            marketType: 'VISTA',
            quantity: 50,
            price: '65.20'
          }
        ]
      }
    ]
  };

  onAssetClicked(asset: Asset): void {
    console.log('Asset clicked:', asset);
    console.log('Operations:', asset.operations);
    // Navigate to asset details or open modal
  }
}
