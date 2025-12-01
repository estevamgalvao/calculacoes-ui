export type OperationType = 'BUY' | 'SELL' | 'POSITION'; 

export interface Operation {
  date: string;        
  assetCode: string;
  type: OperationType;
  marketType: string;
  quantity: number;
  price: string;       // BigDecimal as string to avoid losing precision
}