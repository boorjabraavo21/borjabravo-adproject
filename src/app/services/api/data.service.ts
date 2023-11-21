import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedData } from 'src/app/interfaces/data';

@Injectable({
  providedIn: 'root'
})
export abstract class DataService {

  constructor() { }

  public abstract query<T>(resource:string, params:any):Observable<PaginatedData<T>>

  public abstract get<T>(resource:string):Observable<T>

  public abstract post<T>(resource:string, data:any):Observable<T>

  public abstract put<T>(resource:string, data:any):Observable<T>

  public abstract delete<T>(resource:string):Observable<T>
}
