import { Operation } from './operation';

export interface Asset {
  name: string;
  tradingCode: string;
  institution: string;
  averagePrice: string;
  quantity: number;
  totalValue: string;
  realizedProfitLoss: string;
  operations: Operation[];
}