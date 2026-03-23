// footer-bar.component.ts
import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FooterLink {
  id: string;
  label: string;
  url: string;
  icon?: string;
}

export interface FooterAuthor {
  name: string;
  links: FooterLink[];
}

export interface FooterDonation {
  pixKey: string;
  qrCodeUrl: string;
  message?: string;
}

export interface FooterConfig {
  author: FooterAuthor;
  donation: FooterDonation;
}

@Component({
  selector: 'app-footer-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer-bar.component.html',
  styleUrls: ['./footer-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterBarComponent {
  @Input() config!: FooterConfig;
  @Input() currentYear: number = new Date().getFullYear();

  @Output() linkClicked = new EventEmitter<FooterLink>();

  pixCopied: boolean = false;
  private copyTimeout: any;

  onLinkClick(link: FooterLink): void {
    this.linkClicked.emit(link);
  }

  onCopyPixKey(): void {
    if (!this.config?.donation?.pixKey) return;

    navigator.clipboard.writeText(this.config.donation.pixKey).then(() => {
      this.pixCopied = true;
      clearTimeout(this.copyTimeout);
      this.copyTimeout = setTimeout(() => {
        this.pixCopied = false;
      }, 2500);
    });
  }
}