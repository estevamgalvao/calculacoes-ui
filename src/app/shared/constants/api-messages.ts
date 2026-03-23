export const API_MESSAGES_PT: Record<string, string> = {
  'SUCCESS_DEFAULT': 'Operação realizada com sucesso!',
  'USER_NOT_FOUND': 'Usuário não encontrado no sistema.',
  'INVALID_PASSWORD': 'A senha digitada está incorreta.',
  'UNAUTHORIZED': 'Você não tem permissão para acessar este recurso.'
};

export const HTTP_STATUS_GENERIC: Record<number, string> = {
  400: 'Dados inválidos. Por favor, revise os campos.',
  401: 'Sua sessão expirou. Faça login novamente.',
  403: 'Acesso negado.',
  404: 'O recurso solicitado não existe.',
  500: 'Erro interno no servidor. Tente novamente em instantes.'
};