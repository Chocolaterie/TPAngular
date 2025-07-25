import { Component } from '@angular/core';
import {User} from '../../models/user.model';
import {FormsModule} from '@angular/forms';
import {TranslatePipe} from '@ngx-translate/core';
import {StarRatingComponent} from '../../components/star-rating/star-rating.component';
import {UserService} from '../../services/user.service';

declare const UIkit: any;

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    TranslatePipe,
    StarRatingComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  public user : User = new User("isaac@gmail.com", "password");

  constructor(private userService: UserService) {
  }

  callApi(){

    // Affiche la popup de chargement
    this.showLoading()

    // Appeler url /login du back
    this.userService.login(this.user).subscribe(
      {
        next : json => {
          // si le code metier == 200 => connecté(e) + stocker en cache front le token
          if (json.code === "200"){
            console.log(json.data);

            this.hideLoading();

            alert(json.message);
          }
          // Sinon popup d'erreur
          else {

            this.hideLoading();

            alert(json.message);
          }
        }
      }
    )
  }


  showLoading(): void {
    UIkit.modal('#loading-modal').show();
  }

  hideLoading(): void {
    UIkit.modal('#loading-modal').hide();
  }

}
