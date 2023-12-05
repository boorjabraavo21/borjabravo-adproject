export interface Player {
    id?:number,
    name:string,
    position:'FW' | 'MF' | 'DF' | 'GK',
    nation:string,
    age:number,
    rating:number,
    team?:string,
    picture?:string | null
}
