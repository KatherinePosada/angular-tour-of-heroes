import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

import { MessageService } from '../message.service';
import { Power } from '../powers/power';

@Injectable({
  providedIn: 'root'
})
export class PowerService {
  private powersUrl = "http://localhost:3000/powers";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }

  /** Log a HeroService message with the MessageService */
  private log(message: string){
    this.messageService.add(`PowerService: ${message}`)
  }

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getPowers(): Observable<Power[]>{
    return this.http.get<Power[]>(this.powersUrl)
    .pipe(
      tap(_ => this.log('fetched powers')),
      catchError(this.handleError<Power[]>('getPowers', []))
    );
  }

  getPower(id: number): Observable<Power>{
    const url = `${this.powersUrl}/${id}`;

    return this.http.get<Power>(url).pipe(
      tap(_ => this.log(`fetched power id=${id}`)),
      catchError(this.handleError<Power>(`getPower id=${id}`))
    );
  }

}
