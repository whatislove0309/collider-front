import { Component, inject, ViewChild } from '@angular/core';
import { GraphWrapperComponent } from './graph-wrapper/graph-wrapper.component';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-graph',
  imports: [GraphWrapperComponent, ModalWrapperComponent],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.scss'
})
export class GraphComponent {
  @ViewChild(GraphWrapperComponent) graph!: GraphWrapperComponent;
  @ViewChild(ModalWrapperComponent) chat!: ModalWrapperComponent;

  router = inject(Router);
  isModalOpen: boolean = true;

  selectNode(node: any): void {
    this.chat.sendNodePdf(node);
  }

  redirect(): void {
    this.router.navigate(['/graph/']);
  }

  openModal(): void {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
