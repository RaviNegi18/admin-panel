export interface RegisterData{
    name:string,
    email:string,
    password:string
}

export interface LoginData{
    email:string,
    password:string
}


export interface User{
    _id:string,
    name:string,
    email:string
}

export interface AuthState{
    user:User | null,
    token:string | null,
    loading:boolean,
    error:string | null,
    success:boolean
}