import { PaginatedData } from "./data"

export interface Player {
    id:number,
    name:string,
    position:'Forward' | 'Midfielder' | 'Defense' | 'GoalKeeper',
    nation:string,
    age:number,
    rating:number,
    team:string,
    picture:string
}

export type PaginatedPlayers = PaginatedData<Player>