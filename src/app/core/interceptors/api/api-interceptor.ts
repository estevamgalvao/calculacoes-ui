import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap, catchError, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ResponseHandlerService } from '../../services/response-handler.service';
import { ApiResponse } from '../../../shared/models/api-response';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const responseHandler = inject(ResponseHandlerService);
  const messageService = inject(MessageService);

  const showSuccess = (detail: string) => {
    messageService.add({ severity: 'success', summary: 'Sucesso', detail });
  };

  const showError = (detail: string) => {
    messageService.add({
      severity: 'error',
      summary: 'Erro',
      detail: detail || 'Ocorreu um erro ao processar a operação.'
    });
  };

  return next(req).pipe(

    // "Espia" a resposta sem modificá-la
    tap((event) => {
      if (event instanceof HttpResponse) {
        // aq o TypeScript sabe exatamente o formato do body assertion
        const body = event.body as ApiResponse<unknown>;

        if (body?.success) {
          const msg = responseHandler.handleResponse(body);
          //showSuccess(msg);
        }
      }
    }),

    // Captura qualquer erro HTTP (4xx, 5xx, sem conexão)
    catchError((error: HttpErrorResponse) => {
      const errorData: ApiResponse<null> = {
        success: false,
        status: error.status,
        message: error.error?.message || '',
        data: null,
        type: 'error',
        timestamp: new Date().toISOString()
      };

      const msg = responseHandler.handleResponse(errorData);
      showError(msg);

      // Relança o erro para que o componente também possa tratá-lo se necessário
      return throwError(() => error);
    })
  );
};