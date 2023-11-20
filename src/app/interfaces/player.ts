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
