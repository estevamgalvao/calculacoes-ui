export type OperationType = 'BUY' | 'SELL' | 'POSITION'; 

export interface Operation {
  date: string;        
  assetCode: string;
  type: OperationType;
  marketType: string;
  quantity: number;
  price: string;       // BigDecimal as string to avoid losing precision
}

// Mapping for translations (constant for immutability and performance)
export const OPERATION_TYPE_TRANSLATIONS: Record<OperationType, string> = {
  BUY: 'COMPRA',
  SELL: 'VENDA',
  POSITION: 'POSIÇÃO'
} as const;

// Utilitary function to get the translation (type-safe and reusable)
export function getOperationTypeTranslation(type: OperationType): string {
  return OPERATION_TYPE_TRANSLATIONS[type];
}