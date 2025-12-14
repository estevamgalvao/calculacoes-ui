import { Component } from '@angular/core';
import { FileUploadCardComponent, UploadedFile } from '../../components/file-upload-card/file-upload-card.component';
import { HeaderBarComponent, MenuItem } from '../../components/header-bar/header-bar.component';

@Component({
  selector: 'app-home',
  imports: [
    FileUploadCardComponent,
    HeaderBarComponent
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {

  /* Properties for HeaderBarComponent */
  activeMenuId: string = 'home';

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


  /* Properties for FileUploadCardComponent */
  currentFile: File | null = null;
  currentFileMetadata: UploadedFile | null = null;
  isUploading = false;

  onFileSelected(file: File): void {
    console.log('File selected:', file);
    this.currentFile = file;

    // Creating new object to trigger change detection in child component
    this.currentFileMetadata = {
          ...this.currentFileMetadata,
          name: file.name,
          size: file.size,
          status: 'loading'
    };

    // Simulate upload process
    this.isUploading = true;
    this.isUploading = false;

    // Creating new object to trigger change detection in child component
    this.currentFileMetadata = {
        ...this.currentFileMetadata,
        name: file.name,
        size: file.size,
        status: 'ready'
      };
  }

  onProcessFile(): void {
    console.log('Processing file:', this.currentFile);
  }

  onFileRemoved(): void {
    this.currentFile = null;
    this.currentFileMetadata = null;
  }



}
