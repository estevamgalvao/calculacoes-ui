export interface ApiResponse<T> {
  success: boolean;
  status: number;
  type: string;
  message: string;
  timestamp: string;
  data: T;
}