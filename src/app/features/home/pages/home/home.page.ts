import { Component } from '@angular/core';
import { FileUploadCardComponent, UploadedFile } from '../../components/file-upload-card/file-upload-card.component';

@Component({
  selector: 'app-home',
  imports: [FileUploadCardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {

  currentFile: UploadedFile | null = null;
  isUploading = false;

  onFileSelected(file: File): void {
    // Set initial loading state
    this.currentFile = {
      name: file.name,
      size: file.size,
      status: 'loading'
    };

    // Simulate upload process
    this.isUploading = true;
    
    // Your actual upload logic here
    setTimeout(() => {
      if (this.currentFile) {
        this.currentFile = {
          ...this.currentFile,
          status: 'ready'
        };
      }
      this.isUploading = false;
    }, 2000);
  }

  onFileRemoved(): void {
    this.currentFile = null;
  }

}
