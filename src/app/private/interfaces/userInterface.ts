export interface UserResponse {
    ok: boolean;
    mensaje: string;
    users: User[];
    usersNumbers: number;
}

export interface User {
    _id?: string;
    name?: string;
    img?: string;
    email?: string;
    created?: string | Date | any;
}
export interface UserUpdate {
    name?: string;
    img?: string;
    email?: string;

}

export interface UserLogin {
    ok: boolean;
    userLogin: UserLoginLocalStorage;
    token: string;
}

export interface UserLoginLocalStorage {
    _id: string;
    name: string;
    img: string;
    email: string;
    password: string;
    created: Date;
    __v: number;
}

export interface UserUpdateResponse {
    ok: boolean;
    mensaje: string;
    userSaved: UserSaved;
}

export interface UserSaved {
    _id: string;
    name: string;
    img: string;
    email: string;
    password: string;
    created: Date;
    __v: number;
}


export interface UserResponse {
    ok: boolean;
    mensaje: string;
    user: User;
}

export interface UserRequestCreated {
    name: string,
    email: string,
    password: string,
    img?: string,
    created?: Date,
    _id?: string
}

export interface UserResponseCreated {
    ok:          boolean;
    message:     string;
    userCreated: UserCreated;
}

export interface UserCreated {
    name:     string;
    img:      string;
    email:    string;
    password: string;
    _id:      string;
    created:  Date;
    __v:      number;
}