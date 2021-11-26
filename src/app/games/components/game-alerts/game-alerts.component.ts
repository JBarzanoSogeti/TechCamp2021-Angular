import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Game } from '../../interfaces/game.interface';
import { GameListComponent } from '../game-list/game-list.component';

@Component({
  selector: 'game-alerts',
  templateUrl: './game-alerts.component.html',
  styleUrls: ['./game-alerts.component.css']
})
export class GameAlertsComponent {

  @Input() game!: Game;
  @Output() button: EventEmitter<Game>= new EventEmitter();
  
  onNotify(){
    this.button.emit(this.game);
  }

  constructor() { }
}
