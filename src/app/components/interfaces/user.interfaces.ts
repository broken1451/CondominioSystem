import { AbstractControl } from "@angular/forms";

export interface UserLoginResponse {
    ok: boolean;
    userLogin: UserLogin;
    token: string;
}

export interface UserLogin {
    _id: string;
    name: string;
    img: string;
    email: string;
    password: string;
    created: Date | null;
    __v: number;
}

export interface UserLoginRequest {
    email: AbstractControl;
    password: AbstractControl;
    recuerdame?: boolean;
}
