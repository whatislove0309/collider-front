import { NgIf } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { NgxGraphModule } from '@swimlane/ngx-graph';
import { Subject, switchMap } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { GraphDataService } from '../../../services/graph.service';
import { RadialLayout } from '../../../core/graph-layouts/radial-layout';
import * as shape from 'd3-shape';
import { DialogService } from '../../../services/dialog.service';
import { BaseDialogComponent } from '../../../core/components/base-dialog/base-dialog.component';
import { ModalWrapperComponent } from '../modal-wrapper/modal-wrapper.component';

@Component({
  selector: 'app-graph-wrapper',
  imports: [NgxGraphModule, NgIf, BaseDialogComponent],
  templateUrl: './graph-wrapper.component.html',
  styleUrl: './graph-wrapper.component.scss',
})
export class GraphWrapperComponent implements OnInit {
  @ViewChild('graphContainer', { static: true }) graphContainer!: ElementRef;
  @Output() selectNode: EventEmitter<any> = new EventEmitter<any>();
  zoomToFit$: Subject<{ autoCenter: boolean; force: boolean }> = new Subject();
  hoveredNode: string | null = null;

  popupVisible = false;
  popupLabel = '';
  popupPosition = { top: '0px', left: '0px' };

  nodes: any[] = [];
  links: any[] = [];

  update$ = new Subject<boolean>();
  centerX = (window.innerWidth / 2) * 0.7;
  centerY = window.innerHeight / 2;
  layout: RadialLayout = new RadialLayout(this.centerX, this.centerY);
  curve = shape.curveBasis;

  route = inject(ActivatedRoute);
  router = inject(Router);
  graphDataService = inject(GraphDataService);

  isModalOpen: boolean = false;
  modalNode: any;

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap((params: ParamMap) => {
          const id = params.get('id');
          if (!id) {
            return this.graphDataService.fetchGraphData();
          }
          return this.graphDataService.fetchGraphDataById(+id);
        })
      )
      .subscribe((data) => {
        this.links = this.formatData(data[1]);
        this.nodes = data[0];
        this.update$.next(true);
      });

    setTimeout(() => {
      this.update$.next(true);
    }, 100);
  }

  formatData(arr: any[]): any[] {
    return arr
      .map((link) => {
        if (link.source && link.source.includes('works_')) {
          link.source = link.source.replace('works_', '');
        }
        if (link.target && link.target.includes('works_')) {
          link.target = link.target.replace('works_', '');
        }
        return link;
      })
      .filter((link) => link.source != link.target);
  }

  formatPoints(points: { x: number; y: number }[]): string {
    return points?.map((p) => `${p.x},${p.y}`).join(' ') || '';
  }

  showLabelPopup(node: any, event: MouseEvent) {
    this.hoveredNode = node?.id;
    this.popupLabel = node.label;
    this.popupVisible = true;

    const offsetX = 15;
    const offsetY = 15;

    this.popupPosition = {
      top: `${event.clientY + offsetY}px`,
      left: `${event.clientX + offsetX}px`,
    };
  }

  hideLabelPopup() {
    this.hoveredNode = null;
    this.popupVisible = false;
    this.popupLabel = '';
  }

  zoomToFitGraph() {
    this.zoomToFit$.next({ autoCenter: true, force: true });
  }

  onNodeSelect(node: any) {
    if (node.type === 'theme') {
      return;
    }

    if (node.type === 'end') {
      let pdfUrl = node.openalex_work?.open_access?.oa_url;
      node.pdfUrl = pdfUrl;
      this.selectNode.emit(node);
      this.openModal(node);
      return;
    }

    const nodeId = node?.id;
    this.router.navigate(['/graph/', nodeId]);
  }

  openModal(node: any): void {
    let pdfUrl = node.openalex_work?.open_access?.oa_url;
    this.graphDataService.fetchPdfUrl(pdfUrl).subscribe({
      next: (pdfBlob) => {
        node.pdfUrl = URL.createObjectURL(pdfBlob).replace("blob:", "");
        if (node.pdfUrl) {1
          this.modalNode = node;
          this.isModalOpen = true;
        }
      },
      error: (err) => {
        node.pdfUrl = pdfUrl;
        if (node.pdfUrl) {
          this.modalNode = node;
          this.isModalOpen = true;
        }
      },
    });
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.modalNode = null;
  }
}
