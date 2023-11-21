import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';
import { Player } from 'src/app/interfaces/player';
import { BehaviorSubject } from 'rxjs';
import { Pagination } from 'src/app/interfaces/data';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private _players = new BehaviorSubject<Player[]>([])
  public players$ = this._players.asObservable()
  private _pagination = new BehaviorSubject<Pagination>({page:0, pageCount: 0, pageSize: 0, total:0})
  public pagination$ = this._pagination.asObservable()
  constructor(
    public playerSvc:PlayerService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.onLoadPlayers()
  }

  onLoadPlayers(page:number = 0, refresh:any = null) {
    this.playerSvc.query("").subscribe(response => {
      this._players.next(response.data)
      this._pagination.next(response.pagination)

      if(refresh)
        refresh.complete()
    })
  }

  toPlayerPage(id:number) {
    this.router.navigate(['/player-info', id])
  }

  toMySquads() {
    this.router.navigate(['/mysquads'])
  }

  toMyPlayers() {
    this.router.navigate(['/myplayers'])
  }
}
