import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface GraphData {
  nodes: any[];
  links: any[];
}

@Injectable({
  providedIn: 'root',
})
export class GraphDataService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  fetchGraphData(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  fetchGraphDataById(id: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${id}`);
  }

  fetchPdfUrl(url: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/links`, 
      { link: url },
    );
  }
}
