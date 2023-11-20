import { Player } from "./player";

export interface Squad {
    id:number,
    name:string,
    badge:string,
    lineUp?:'4-3-3' | '4-4-2' | '3-4-3',
    players:Player[]
}
