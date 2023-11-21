import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, map } from 'rxjs';
import { PaginatedData } from 'src/app/interfaces/data';
import { ApiService } from '../api.service';
import { StrapiArrayResponse, StrapiResponse } from 'src/app/interfaces/strapi';

@Injectable({
  providedIn: 'root'
})
export class StapiDataService extends DataService {
  public override query<T>(resource: string, params: any): Observable<PaginatedData<T>> {
    return this.api.get(`/${resource}`,params).pipe(map((response:StrapiArrayResponse<T>)=>{
      return {
        data: response.data.map(data => {return {...(data.attributes), id:data.id}}),
        pagination: response.meta.pagination!
      }
    }))
  }
  public override get<T>(resource: string): Observable<T> {
    return this.api.get(`${resource}`).pipe(map((response:StrapiResponse<T>)=>{
      return response.data.attributes
    }))
  }
  public override post<T>(resource: string, data: any): Observable<T> {
    return this.api.post(`${resource}`,data).pipe(map((response:StrapiResponse<T>)=>{
      return {
        id:response.data.id,
        ...response.data.attributes
      }
    }))
  }
  public override put<T>(resource: string, data: any): Observable<T> {
    return this.api.put(`${resource}`,data).pipe(map((response:StrapiResponse<T>)=>{
      return {
        id:response.data.id,
        ...response.data.attributes
      }
    }))
  }
  public override delete<T>(resource: string): Observable<T> {
    return this.api.delete(`${resource}`).pipe(map((response:StrapiResponse<T>)=>{
      return {
        id:response.data.id,
        ...response.data.attributes
      }
    }))
  }

  constructor(private api:ApiService) {
    super();
  }
}