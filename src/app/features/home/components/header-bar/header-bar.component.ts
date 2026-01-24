import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  badge?: number;
  disabled?: boolean;
}

@Component({
  selector: 'app-header-bar',
  imports: [CommonModule],
  templateUrl: './header-bar.component.html',
  styleUrl: './header-bar.component.scss',
})
export class HeaderBarComponent {
  @Input() appTitle: string = 'CalculAções';
  @Input() appLogo?: string;
  @Input() menuItems: MenuItem[] = [];
  @Input() activeMenuId?: string;
  @Input() showUserMenu: boolean = true;
  @Input() userName?: string;
  @Input() userAvatar?: string;

  @Output() menuItemClicked = new EventEmitter<MenuItem>();
  @Output() userMenuClicked = new EventEmitter<void>();
  @Output() logoClicked = new EventEmitter<void>();

  isMobileMenuOpen = false;

  onMenuItemClick(item: MenuItem): void {
    if (!item.disabled) {
      this.menuItemClicked.emit(item);
      this.closeMobileMenu();
    }
  }

  onLogoClick(): void {
    this.logoClicked.emit();
  }

  onUserMenuClick(): void {
    this.userMenuClicked.emit();
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
  }

  isActive(itemId: string): boolean {
    return this.activeMenuId === itemId;
  }

  getUserInitials(): string {
    if (!this.userName) return 'U';
    
    const names = this.userName.trim().split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  trackByItemId(index: number, item: MenuItem): string {
    return item.id;
  }
}
