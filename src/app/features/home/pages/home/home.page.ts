import { ChangeDetectorRef, Component } from '@angular/core';
import { FileUploadCardComponent, UploadedFile } from '../../components/file-upload-card/file-upload-card.component';
import { HeaderBarComponent, MenuItem } from '../../components/header-bar/header-bar.component';
import { Asset } from '../../../../shared/models/asset';
import { Operation } from '../../../../shared/models/operation';
import { PortfolioOperationsCardComponent } from '../../components/portfolio-operations-card/portfolio-operations-card.component';
import { PortfolioPositionsCardComponent } from '../../components/portfolio-positions-card/portfolio-positions-card.component';
import { CommonModule } from '@angular/common';
import { PortfolioApiService } from '../../../../core/services/portfolio-api.service';
import { ApiResponse } from '../../../../shared/models/api-response';
import { PortfolioSummary } from '../../../../shared/models/portfolio-summary';
import { HelpInfoCardComponent } from '../../components/help-info-card/help-info-card.component';

@Component({
  selector: 'app-home',
  imports: [
    FileUploadCardComponent,
    HeaderBarComponent,
    PortfolioPositionsCardComponent,
    PortfolioOperationsCardComponent,
    HelpInfoCardComponent,
    CommonModule
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {

  constructor(
    private portfolioApi: PortfolioApiService,
    private cdr: ChangeDetectorRef
  ) {}

  /* Properties for HeaderBarComponent */
  activeMenuId: string = 'home';

  menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'fa-home'
    },
    {
      id: 'help',
      label: 'Ajuda',
      icon: 'fa-circle-question'
    }
/*     {
      id: 'portfolio',
      label: 'Portfolio',
      icon: 'fa-briefcase'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: 'fa-exchange-alt',
      badge: 3
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'fa-chart-bar'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'fa-cog'
    } */
  ];

  onMenuItemClicked(item: MenuItem): void {
    console.log('Menu item clicked:', item);
    this.activeMenuId = item.id;
  }

  onUserMenuClicked(): void {
    console.log('User menu clicked');
  }

  onLogoClicked(): void {
    console.log('Logo clicked');
    this.activeMenuId = 'home';
  }


  /* Properties for FileUploadCardComponent */
  currentFile: File | null = null;
  currentFileMetadata: UploadedFile | null = null;
  isUploading = false;
  showUploadComponent = true;

  onFileSelected(file: File): void {
    console.log('File selected:', file);
    this.currentFile = file;

    // Creating new object to trigger change detection in child component
    this.currentFileMetadata = {
          ...this.currentFileMetadata,
          name: file.name,
          size: file.size,
          status: 'loading'
    };

    // Simulate upload process
    this.isUploading = true;
    this.isUploading = false;

    // Creating new object to trigger change detection in child component
    this.currentFileMetadata = {
        ...this.currentFileMetadata,
        name: file.name,
        size: file.size,
        status: 'ready'
      };
  }

  errorMessage: string | null = null;
  summary: PortfolioSummary | null = null;

  /* Properties for Portfolios Components */
  isLoadingPositions = false;
  isLoadingOperations = false;
  selectedAsset: Asset | null = null;
  showPositionsCard = false;
  showOperationsCard = false;


  onProcessFile(): void {
    if (!this.currentFile) {
      console.error('No file selected for processing.');
      return;
    }
    
    this.showUploadComponent = false;
    
    this.isLoadingPositions = true;
    
    this.portfolioApi.uploadCsv(this.currentFile).subscribe({
      next: (res: ApiResponse<PortfolioSummary>) => {
        console.log('File processed, response:', res);
        if (res.success) {
          this.summary = res.data;
        } else {
          this.errorMessage = res.message || 'Erro ao processar o arquivo.';
        }
        console.log('Summary after processing:', this.summary);
        this.isLoadingPositions = false;
        console.log(this.isLoadingPositions + ' after setting to false');
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error(err);
        this.errorMessage =
          err?.error?.message || 'Erro de comunicação com o servidor.';
        this.isLoadingPositions = false;
        this.cdr.markForCheck();
      },
    });

    console.log('Processing file:', this.currentFile);
    
    this.showPositionsCard = true;
  }

  onFileRemoved(): void {
    this.currentFile = null;
    this.currentFileMetadata = null;
  }


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

    this.isLoadingOperations = true;
    // Simulate loading operations
    this.isLoadingOperations = false;
    
    this.showPositionsCard = false;
    this.showOperationsCard = true;
  }

  onCloseClicked(): void {
    console.log('Close clicked, returning to file upload');

    this.showPositionsCard = false;
    this.showUploadComponent = true;
  }

  onOperationClicked(operation: Operation): void {
    console.log('Operation clicked:', operation);
  }

  onBackClicked(): void {
    this.selectedAsset = null;
    this.showOperationsCard = false;
    this.showPositionsCard = true;
  }

}
