import {Component} from '@angular/core';
import {NgClass, NgStyle} from '@angular/common';
import {RouterLink} from '@angular/router';
import {Movie} from '../../models/movie.model';
import {MovieService} from '../../services/movie.service';

declare const UIkit: any;

/**
 * Composant Angular affichant la liste des films sous forme de cartes.
 * Récupère les données depuis un service via une API HTTP.
 */
@Component({
  selector: 'app-movie-list',
  imports: [
    NgStyle,
    NgClass,
    RouterLink
  ],
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.scss'
})
export class MovieListComponent {

  /**
   * Liste des films à afficher, récupérés depuis l'API.
   */
  movies: Movie[] = [];

  /**
   * Injection du service permettant de récupérer les films.
   * @param movieService - Service de gestion des films
   */
  constructor(private movieService: MovieService) {
  }

  /**
   * Cycle de vie Angular : appelé une fois le composant initialisé.
   * Récupère la liste des films via le service MovieService.
   */
  ngOnInit(): void {

    // Affiche la popup de chargement
    this.showLoading()

    // Appelle l'API et met à jour la liste des films
    this.movieService.getMovies().subscribe({
      next: (apiResponse) => {
        this.movies = apiResponse.data;

        this.hideLoading();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des films', err);

        this.hideLoading();
      }
    });
  }

  /**
   * Retourne la classe CSS Font Awesome à appliquer à une étoile de notation.
   * Utilisé pour afficher des étoiles pleines, demi, ou vides selon la note du film.
   *
   * @param index - Position de l’étoile (1 à 5)
   * @param rating - Note du film (ex: 3.5)
   * @returns Classe Font Awesome : 'fas fa-star', 'fas fa-star-half-stroke' ou 'far fa-star'
   */
  getStarClass(index: number, rating: number): string {
    if (index <= Math.floor(rating)) return 'fas fa-star';                  // étoile pleine
    else if (index - 0.5 === rating) return 'fas fa-star-half-stroke';     // demi-étoile
    else return 'far fa-star';                                               // vide
  }

  showLoading(): void {
    UIkit.modal('#loading-modal').show();
  }

  hideLoading(): void {
    UIkit.modal('#loading-modal').hide();
  }
}
