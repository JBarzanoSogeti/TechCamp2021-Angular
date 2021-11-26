import { Game } from './../../interfaces/game.interface';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/shared/services/cart.service';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent implements OnInit{
  
  games: Game[] = [];
  titleSearch: string = '';

  constructor(private route: ActivatedRoute,
    private gameService: GameService,
    private cartService: CartService,
    private formBuilder: FormBuilder) { }
  
  checkoutForm = this.formBuilder.group({
    title: ''
  });

  ngOnInit(): void {
    this.checkoutForm.value.title = this.route.snapshot.queryParamMap.get("text") || '';
    this.titleSearch = this.checkoutForm.value.title;
    console.log('prellamada');
    // 
    console.log('postllamada');
    if(this.checkoutForm.value.title !== '')
    {
      this.searchGames();
      
    }
  }

  searchGames() {
    this.titleSearch = this.checkoutForm.value.title;
    this.gameService.getGames(this.titleSearch).subscribe((data: Game[]) => {
      console.log(data);
      this.games = data;
    });
  }

  onNotify(game: Game) {  
    window.alert(`Serás notificado cuando ${game.external} se encuentre disponible`);
  }

  addToCart(game: Game) {
    this.cartService.addToCart({ title: game.external, price: game.cheapest * 1.5 });
    window.alert(`El producto ${game.external} ha sido añadido a la cesta!`);
  }
}