import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Car } from 'src/entities/car';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CarRepositoryService {
  private apiUrl = environment.apiUrl;
  private carsList: Car[] = [];
  private subject = new Subject<Car[]>();
  private q?: string = '';

  constructor(private http: HttpClient) {
    this.subject.subscribe({
      next: (cars) => {
        this.carsList = cars;
      },
    });
  }

  public list(): Observable<Car[]> {
    return this.subject;
  }

  public query(query?: string) {
    this.q = query;

    const params: Record<string, string> = {};

    if (query && query.length > 0) {
      params['q'] = query;
    }

    this.http
      .get(`${this.apiUrl}/cars`, { params })
      .pipe(map((data) => data as Car[]))
      .subscribe({
        next: (data) => {
          this.subject.next(data);
        },
        error(error) {
          console.error(error);
        },
      });
  }

  public add(formData: FormData) {
    this.http.post(`${this.apiUrl}/cars`, formData).subscribe({
      next: () => {
        this.query(this.q);
      },
      error(error) {
        console.error(error);
      },
    });
  }

  public update(formData: FormData) {
    this.http.put(`${this.apiUrl}/cars`, formData).subscribe({
      next: () => {
        this.query(this.q);
      },
      error(error) {
        console.error(error);
      },
    });
  }

  public delete(id: number) {
    console.log('id', { id });
    this.http
      .delete(`${this.apiUrl}/cars/${id}`, { responseType: 'arraybuffer' })
      .subscribe({
        next: () => {
          this.subject.next(this.carsList.filter((car) => car.id !== id));
        },
        error(error) {
          console.error(error);
        },
      });
  }
}
