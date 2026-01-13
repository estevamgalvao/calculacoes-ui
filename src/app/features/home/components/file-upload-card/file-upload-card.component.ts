import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface UploadedFile {
  name: string;
  size: number;
  status: 'loading' | 'ready';
}

@Component({
  selector: 'app-file-upload-card',
  imports: [CommonModule],
  templateUrl: './file-upload-card.component.html',
  styleUrls: ['./file-upload-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class FileUploadCardComponent {
  @Input() uploadedFile: UploadedFile | null = null;
  @Input() acceptedFormats: string = '*';
  @Input() maxSizeInMB: number = 10;
  @Input() disabled: boolean = false;

  @Output() fileSelected = new EventEmitter<File>();
  @Output() fileRemoved = new EventEmitter<void>();
  @Output() fileProcessed = new EventEmitter<void>();

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileSelected.emit(file);
      // Reset input to allow selecting the same file again
      input.value = '';
    }
  }

  onProcessFile(): void {
    this.fileProcessed.emit();
  }

  onRemoveFile(event: Event): void {
    event.stopPropagation();
    this.fileRemoved.emit();
  }

  formatFileSize(bytes: number): string {
    return `${(bytes / (1024 * 1024)).toFixed(4)} MB`;
  }

  getStatusBadgeClass(): string {
    return this.uploadedFile?.status === 'loading' ? 'bg-warning' : 'bg-success';
  }

  getStatusText(): string {
    return this.uploadedFile?.status === 'loading' ? 'Loading' : 'Ready';
  }

  getStatusIcon(): string {
    return this.uploadedFile?.status === 'loading' ? 'fa-spinner fa-spin' : 'fa-check-circle';
  }
}