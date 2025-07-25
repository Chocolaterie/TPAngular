import { Injectable } from '@angular/core';
import {delay, Observable} from 'rxjs';
import {ApiResponse} from '../models/api.model';
import {Movie} from '../models/movie.model';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) {
  }

  login(user: User): Observable<any> {
    return this.http.post<any>("http://localhost:3000/login", user).pipe(
      delay(1000) // délai de 1000 ms = 1 seconde
    );
  }
}
