import { Asset } from './asset';

export interface PortfolioSummary {
  positions: Asset[];
  totalInvested: string;
  totalRealizedProfitLoss: string;
}