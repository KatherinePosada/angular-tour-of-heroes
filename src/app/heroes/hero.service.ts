import { Injectable } from '@angular/core';
import { Observable, catchError, of, tap } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from '../message.service';
import { Hero } from './hero';

export type HeroNew = Omit<Hero, 'id' | 'createdAt' | 'updatedAt'>;

@Injectable({
  providedIn: 'root'
})
export class HeroService {
  private heroesUrl = "http://localhost:3000/heroes";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(
    private messageService: MessageService,
    private http: HttpClient
  ) { }
  /** Log a HeroService message with the MessageService */
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`)
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

  getHeroes(): Observable<Hero[]>{
    //Como sería con programación inperactiva:
    // try {
    //   const heroes = await this.http.get<Hero[]>(this.heroesUrl);
    //   this.log('fetched heroes');

    //   return heroes;
    // } catch (error) {
    //   this.handleError<Hero[]>('getHeroes', [])
    // }

    //Con programación funcional:
    return this.http.get<Hero[]>(this.heroesUrl)
    .pipe(
      tap(_ => this.log('fetched heroes')),
      catchError(this.handleError<Hero[]>('getHeroes', []))
    );
  }

  getHero(id: number): Observable<Hero>{
    // const hero = HEROES.find(h => h.id === id)!;
    // this.messageService.add(`HeroService: fetched hero id=${id}`);
    // return of(hero);

    const url = `${this.heroesUrl}/${id}`;

    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<any> {
    const url = `${this.heroesUrl}/${hero.id}`;

    return this.http.patch(url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }

  createHero(hero: HeroNew): Observable<any> {
    return this.http.post(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log('created hero')),
      catchError(this.handleError<any>('createHero'))
    );
  }
}
