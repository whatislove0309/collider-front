import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiAssistantService {
  private apiUrl = environment.geminiApiUrl;

  constructor(private http: HttpClient) {}

  sendPdf(pdfUrl: string, topic: string, userInput: string): Observable<any> {
    const formData = new FormData();
    formData.append('pdfUrl', pdfUrl);
    formData.append('userInput', userInput);
    formData.append('topic', topic);

    return this.http.post<any>(`${this.apiUrl}/upload`, formData);
  }

  sendMessage(messages: any[]): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/chat`, {messages});
  }
}
