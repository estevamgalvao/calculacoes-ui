import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { PortfolioSummary } from '../../shared/models/portfolio-summary';

@Injectable({
  providedIn: 'root', // torna o serviço disponível em toda a aplicação
})
export class PortfolioApiService {
  
  private readonly baseUrl = 'http://localhost:8080/api/portfolio';

  constructor(private http: HttpClient) {}

  /**
   * Envia o arquivo CSV para o backend e retorna o ApiResponse<PortfolioSummary>.
   *
   * Repare que o retorno é Observable<ApiResponse<PortfolioSummary>>.
   * A chamada HTTP é sempre assíncrona.
   */
  uploadCsv(file: File): Observable<ApiResponse<PortfolioSummary>> {
    const formData = new FormData();
    formData.append('file', file); // nome "file" precisa bater com @RequestParam("file") do back - mt importante lembrar  

    return this.http.post<ApiResponse<PortfolioSummary>>(
      `${this.baseUrl}/upload`,
      formData
    );
  }
}