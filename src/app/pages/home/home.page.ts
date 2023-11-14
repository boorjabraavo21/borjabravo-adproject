import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../../services/player.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    public players:PlayerService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.players.getAll().subscribe()
  }

  toPlayerPage(id:number) {
    this.router.navigate(['/player-info', id])
  }
}
