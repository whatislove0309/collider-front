import { NgFor, NgIf } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Output,
  ViewChild,
} from '@angular/core';
import { AiAssistantService } from '../../../services/ai-assistant.service';
import { LoaderComponent } from '../../../core/components/loader/loader.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms'

@Component({
  selector: 'app-modal-wrapper',
  imports: [NgIf, NgFor, LoaderComponent, ReactiveFormsModule],
  templateUrl: './modal-wrapper.component.html',
  styleUrl: './modal-wrapper.component.scss',
})
export class ModalWrapperComponent implements AfterViewChecked {
  @Output() closeModal: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('messageContainer') private messageContainer!: ElementRef;

  private chatService: AiAssistantService = inject(AiAssistantService);

  messages: any = [];
  loading: boolean = false;
  messageInput = new FormControl('');

  ngAfterViewChecked() {  
    this.scrollToBottom();
  }

  sendMessage(): void {
    this.loading = true;
    const text = this.messageInput.value?.trim();
    if (!text) return;

    this.messages.push({ from: 'user', text });
    this.messageInput.reset();

    this.chatService.sendMessage(this.messages).subscribe((res) => {
      this.messages.push({ from: 'Assistant', text: res.response });
      this.loading = false;
    });
  }

  sendNodePdf(node: any): void {
    this.messages.push({ from: 'user', text: node.label });
    if (node.pdfUrl) {
      this.loading = true;
      this.chatService.sendPdf(node?.pdfUrl, node?.label, '').subscribe((res) => {
        this.messages.push({ from: 'Assistant', text: res.response });
        this.loading = false;
      });
    }
  }

  scrollToBottom(): void {
    if (this.messageContainer) {
      this.messageContainer.nativeElement.scrollTo({
        top: this.messageContainer.nativeElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  close(): void {
    this.closeModal.emit();
  }
}
