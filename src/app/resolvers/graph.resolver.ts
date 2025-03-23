import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { GraphDataService, GraphData } from '../services/graph.service';

@Injectable() 
export class GraphDataResolver implements Resolve<any[]> {

  private graphService = inject(GraphDataService);

  resolve(route: ActivatedRouteSnapshot): Observable<any[]> {
    const id = +(route.paramMap.get('id') || 0);
    
    if (id) {
      return this.graphService.fetchGraphDataById(id);
    } else {
      return this.graphService.fetchGraphData();
    }
  }
}
