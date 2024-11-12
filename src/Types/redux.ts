import { IUser } from "./User";

export enum DataStatus{
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    FAILED = 'FAILED',
    IDLE = 'IDLE'
}

export interface userState{
    error:string|undefined,
    status:DataStatus,
    user:IUser|null
}

export interface candidateState{
    error:string|undefined,
    status:DataStatus,
    candidates:[]
}