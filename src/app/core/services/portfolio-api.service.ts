import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../shared/models/api-response';
import { PortfolioSummary } from '../../shared/models/portfolio-summary';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root', // makes the service available throughout the application
})
export class PortfolioApiService {
  
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly portfolioUrl = this.baseUrl + '/portfolio';

  constructor(private http: HttpClient) {}

  /**
   * Sends the CSV file to the backend and returns ApiResponse<PortfolioSummary>.
   *
   * Note that the return type is Observable<ApiResponse<PortfolioSummary>>.
   * The HTTP call is always asynchronous.
   */
  uploadCsv(file: File): Observable<ApiResponse<PortfolioSummary>> {
    const formData = new FormData();
    formData.append('file', file); // name "file" must match @RequestParam("file") on the backend - very important to remember  

    return this.http.post<ApiResponse<PortfolioSummary>>(
      `${this.portfolioUrl}/upload`,
      formData
    );
  }
}