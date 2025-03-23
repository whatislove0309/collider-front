import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-base-dialog',
  imports: [NgIf],
  templateUrl: './base-dialog.component.html',
  styleUrl: './base-dialog.component.scss'
})
export class BaseDialogComponent {
  @Input() isOpen: boolean = false;
  @Input() node: any;
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();

  pdfUrlSafe?: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(): void {
    if (this.node?.pdfUrl) {
      this.pdfUrlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(this.node.pdfUrl);
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
