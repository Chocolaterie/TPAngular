import { Routes } from '@angular/router';
import {MovieListComponent} from './pages/movie-list/movie-list.component';
import {LoginComponent} from './pages/login/login.component';

export const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'login', component: LoginComponent },
];
