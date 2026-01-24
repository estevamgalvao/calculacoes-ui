import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface HelpSection {
  id: string;
  title: string;
  icon: string;
  content: string;
  items?: string[];
  example?: string;
  isExpanded?: boolean;
}

@Component({
  selector: 'app-help-info-card',
  imports: [CommonModule],
  templateUrl: './help-info-card.component.html',
  styleUrl: './help-info-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpInfoCardComponent {
  helpSections: HelpSection[] = [
    {
      id: 'project-goal',
      title: 'Sobre o Projeto',
      icon: 'fa-info-circle',
      content: 'O CalculAções permite que você envie um arquivo CSV com seu histórico de operações na bolsa brasileira (formato B3) e receba um resumo consolidado do seu portfólio.',
      items: [
        'Posições consolidadas por ativo',
        'Preço médio de compra calculado',
        'Lucro/prejuízo realizado total e por ação',
        'Informações organizadas para declaração do Imposto de Renda'
      ],
      isExpanded: true
    },
    {
      id: 'file-format',
      title: 'Formato do Arquivo',
      icon: 'fa-file-csv',
      content: 'O arquivo deve ser um CSV no formato padrão da B3, contendo suas operações de compra, venda e posições iniciais.',
      items: [
        'Formato: CSV (separado por vírgulas)',
        'Codificação: UTF-8',
        'Colunas: Data, Tipo de Operação, Tipo de Mercado, Instituição, Código do Ativo, Quantidade, Preço, Valor Total',
        'Importante: Adicione manualmente as linhas de POSIÇÃO do ano anterior antes de enviar'
      ],
      example: '31/12/2023,POSIÇÃO,,,XP INVESTIMENTOS CCTVM S/A,MCHF11,234," R$ 9,18 "," R$ 2.148,12 "\n24/01/2024,Compra,Mercado Fracionário,-,XP INVESTIMENTOS CCTVM S/A,GOAU4F,50," R$ 10,03 "," R$ 501,50 "\n19/01/2024,Venda,Mercado à Vista,-,XP INVESTIMENTOS CCTVM S/A,USIM5,100," R$ 8,64 "," R$ 864,00 "',
      isExpanded: false
    },
    {
      id: 'restrictions',
      title: 'Restrições e Limites',
      icon: 'fa-exclamation-triangle',
      content: 'Para garantir o melhor desempenho e processamento correto, observe os seguintes limites:',
      items: [
        'Tamanho máximo do arquivo: 5 MB',
        'Formato aceito: apenas CSV',
        'A B3 exibe apenas compras e vendas do ano atual',
        'Você deve adicionar manualmente as posições do ano anterior',
        'Use o formato de data DD/MM/AAAA',
        'Valores monetários devem seguir o padrão brasileiro (R$ X,XX)'
      ],
      isExpanded: false
    }
  ];

  toggleSection(sectionId: string): void {
    const section = this.helpSections.find(s => s.id === sectionId);
    if (section) {
      section.isExpanded = !section.isExpanded;
    }
  }

  trackBySectionId(index: number, section: HelpSection): string {
    return section.id;
  }
}
