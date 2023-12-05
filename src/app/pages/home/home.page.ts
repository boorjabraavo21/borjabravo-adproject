import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
<<<<<<< Updated upstream
=======
import { Player } from 'src/app/interfaces/player';
import { BehaviorSubject } from 'rxjs';
import { Pagination } from 'src/app/interfaces/data';
import { AuthService } from 'src/app/services/api/auth.service';
>>>>>>> Stashed changes

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

<<<<<<< Updated upstream
=======
  private _players = new BehaviorSubject<Player[]>([])
  public players$ = this._players.asObservable()
  private _pagination = new BehaviorSubject<Pagination>({page:0, pageCount: 0, pageSize: 0, total:0})
  public pagination$ = this._pagination.asObservable()
  @Output() onPlayerClicked = new EventEmitter()
>>>>>>> Stashed changes
  constructor(
    public players:PlayerService,
    private router:Router
  ) {}

  ngOnInit(): void {
<<<<<<< Updated upstream
    this.players.getAll().subscribe()
  }

  toPlayerPage(id:number) {
    this.router.navigate(['/player-info', id])
  }

  toMySquads() {
    this.router.navigate(['/mysquads'])
  }

  toMyPlayers() {
    this.router.navigate(['/myplayers'])
=======

  }

  toPlayerPage(player:Player) {
    this.router.navigate(['/player-info', player.id])
    this.onPlayerClicked.emit(player)
>>>>>>> Stashed changes
  }
}
