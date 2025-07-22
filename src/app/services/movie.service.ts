import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../models/movie.model';
import {ApiResponse} from '../models/api.model';
import {delay, Observable} from 'rxjs';

/**
 * Service Angular responsable de la récupération des films via l'API REST.
 * Ce service est fourni à la racine de l'application (singleton).
 */
@Injectable({
  providedIn: 'root'
})
export class MovieService {

  /**
   * URL de l'API pour accéder à la ressource des films.
   * À adapter selon l'environnement (local, prod, etc.).
   */
  private baseUrl = 'http://localhost:3000/movies';

  /**
   * Crée une instance du MovieService.
   * @param http - Service Angular pour effectuer des requêtes HTTP.
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Récupère la liste des films depuis l'API.
   *
   * @returns Un `Observable` contenant une réponse API typée,
   *          incluant une liste de films dans la propriété `data`.
   *
   * Exemple de réponse :
   * ```json
   * {
   *   "code": "200",
   *   "message": "Liste des films récupérée",
   *   "data": [ ... ]
   * }
   * ```
   */
  getMovies(): Observable<ApiResponse<Movie[]>> {
    return this.http.get<ApiResponse<Movie[]>>(this.baseUrl).pipe(
      delay(1000) // délai de 1000 ms = 1 seconde
    );
  }
}
