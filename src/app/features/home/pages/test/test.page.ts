import { Component } from '@angular/core';
import { HeaderBarComponent, MenuItem } from '../../components/header-bar/header-bar.component';

@Component({
  selector: 'app-test',
  imports: [HeaderBarComponent],
  templateUrl: './test.page.html',
  styleUrl: './test.page.scss',
})
export class TestPage {
activeMenuId = 'home';

  menuItems: MenuItem[] = [
    {
      id: 'home',
      label: 'Home',
      icon: 'fa-home'
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: 'fa-briefcase'
    },
    {
      id: 'transactions',
      label: 'Transactions',
      icon: 'fa-exchange-alt',
      badge: 3
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'fa-chart-bar'
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'fa-cog'
    }
  ];

  onMenuItemClicked(item: MenuItem): void {
    console.log('Menu item clicked:', item);
    this.activeMenuId = item.id;
    // Navigate or perform action
  }

  onUserMenuClicked(): void {
    console.log('User menu clicked');
    // Open user dropdown or navigate to profile
  }

  onLogoClicked(): void {
    console.log('Logo clicked');
    this.activeMenuId = 'home';
    // Navigate to home
  }
}
