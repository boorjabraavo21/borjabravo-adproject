import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientProvider } from './http-client.provider';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpClientWebProvider extends HttpClientProvider {

  constructor(private readonly httpClient:HttpClient) { 
    super()
  }

  public override getImage(url: string): Observable<Blob> {
    return this.httpClient.get(url, {responseType:"blob"})
  }
  public override get<T>(url: string, params: any, headers: any): Observable<T> {
    return this.httpClient.get<T>(url, {params: new HttpParams({ fromObject:params }), headers:createHeaders(headers)})
  }
  public override post<T>(url: string, body: any, headers: any, urlEncoded = false): Observable<T> {
    return this.httpClient.post<T>(url, createBody(body, urlEncoded), {headers:createHeaders(headers, urlEncoded)})
  }
  public override put<T>(url: string, body: any, headers: any, urlEncoded = false): Observable<T> {
    return this.httpClient.put<T>(url, createBody(body, urlEncoded), {headers:createHeaders(headers, urlEncoded)})
  }
  public override patch<T>(url: string, body: any, headers: any, urlEncoded = false): Observable<T> {
    return this.httpClient.patch<T>(url, createBody(body, urlEncoded), {headers:createHeaders(headers, urlEncoded)})
  }
  public override delete<T>(url: string, params: any, headers: any): Observable<T> {
    return this.httpClient.delete<T>(url, {params: new HttpParams({ fromObject:params }), headers:createHeaders(headers)})
  }
  public override setServerTrustMode(mode: 'default' | 'nocheck' | 'pinned' | 'legacy'): void {

  }
}
function createHeaders(headers: any, urlEncoded: boolean = false): import("@angular/common/http").HttpHeaders | { [header: string]: string | string[]; } | undefined {
  var _headers = new HttpHeaders(headers)
  if(urlEncoded) {
    _headers.set('Accept', 'application/x-www-form-urlencoded')
  }
  return _headers
}

function createBody(body: any, urlEncoded: boolean): any | HttpParams {
  return urlEncoded ? new HttpParams({fromObject:body}) : body
}

