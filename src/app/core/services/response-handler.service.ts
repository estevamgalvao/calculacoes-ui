import { Injectable } from '@angular/core';

import { API_MESSAGES_PT, HTTP_STATUS_GENERIC } from '../../shared/constants/api-messages';
import { ApiResponse } from '../../shared/models/api-response';

@Injectable({
  providedIn: 'root'
})
export class ResponseHandlerService {

  handleResponse<T>(response: ApiResponse<T>): string {
    /* if (response.success) {
      return this.translateMessage(response.message) || 'Operação concluída.';
    } */
    if (response.success) {
      return 'Operação concluída.';
    }
    
    return this.getErrorMessage(response);
  }

  private getErrorMessage(response: ApiResponse<any>): string {
    // Se for um erro crítico (500) ou erro de conexão (0), usamos a genérica
    if (response.status >= 500 || response.status === 0) {
      return HTTP_STATUS_GENERIC[response.status] || 'Erro inesperado no servidor.';
    }

    // Tenta traduzir a mensagem específica vinda da API
    // const translated = this.translateMessage(response.message);
    
    // Se não houver tradução mapeada, retorna uma genérica baseada no status (ex: 400, 404)
    /* return translated || HTTP_STATUS_GENERIC[response.status] || 'Ocorreu um erro ao processar a requisição.'; */
    return HTTP_STATUS_GENERIC[response.status] || 'Ocorreu um erro ao processar a requisição.';
  }

  /* private translateMessage(message: string): string | undefined {
    return API_MESSAGES_PT[message];
  } */
}