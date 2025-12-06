import { Component } from '@angular/core';
import { FileUploadCardComponent, UploadedFile } from '../../components/file-upload-card/file-upload-card.component';

@Component({
  selector: 'app-home',
  imports: [FileUploadCardComponent],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
})
export class HomePage {

  currentFile: File | null = null;
  currentFileMetadata: UploadedFile | null = null;
  isUploading = false;
  // uploadingStatus: 'loading' | 'ready' | null = null;

  onFileSelected(file: File): void {
    console.log('File selected:', file);
    // Set initial loading state
    this.currentFile = file;

    this.currentFileMetadata = {
          ...this.currentFileMetadata, //nenhum filho atualiza, porque Angular não detecta mutação, apenas nova referência
          name: file.name,
          size: file.size,
          status: 'loading'
    };

    // Simulate upload process
    this.isUploading = true;

      this.isUploading = false;
      this.currentFileMetadata = {
          ...this.currentFileMetadata, //nenhum filho atualiza, porque Angular não detecta mutação, apenas nova referência
          name: file.name,
          size: file.size,
          status: 'ready'
        };
  }

  onFileRemoved(): void {
    this.currentFile = null;
    this.currentFileMetadata = null;
  }

}
