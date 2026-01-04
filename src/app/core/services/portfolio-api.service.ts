import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { PortfolioSummary } from '../../shared/models/portfolio-summary';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', // torna o serviço disponível em toda a aplicação
})
export class PortfolioApiService {
  
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly portfolioUrl = this.baseUrl + '/portfolio';

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
      `${this.portfolioUrl}/upload`,
      formData
    );
  }
}