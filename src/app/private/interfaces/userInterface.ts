export interface UserResponse {
    ok: boolean;
    mensaje: string;
    users: User[];
    usersNumbers: number;
}

export interface User {
    _id: string;
    name: string;
    img: string;
    email: string;
    created: string | Date | any;
}

export interface UserLogin {
    ok:        boolean;
    userLogin: UserLoginLocalStorage;
    token:     string;
}

export interface UserLoginLocalStorage {
    _id:      string;
    name:     string;
    img:      string;
    email:    string;
    password: string;
    created:  Date;
    __v:      number;
}