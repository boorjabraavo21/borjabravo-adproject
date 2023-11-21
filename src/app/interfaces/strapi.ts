export interface StrapiData<T> {
    id:number,
    attributes:T
}

export interface StrapiArrayResponse<T> {
    data:StrapiData<T>[],
    meta: {
        pagination?: {
            page:number,
            pageSize: number,
            pageCount:number,
            total:number
        }
    }
}

export interface StrapiResponse<T> {
    data:StrapiData<T>
}

export interface StrapiUser {
    id:number,
    username:string,
    email:string
}

export interface StrapiLoginPayload {
    identifier:string,
    password:string
}

export interface StrapiRegisterPayload {
    username:string,
    email:string,
    password:string
}

export interface StrapiLoginResponse {
    jwt:string,
    user:StrapiUser
}

export interface StrapiRegisterResponse {
    jwt:string,
    user:StrapiUser
}

export interface StrapiExtendedUser {
    name:string,
    surname:string,
    user_id:number,
    picture?:string
}