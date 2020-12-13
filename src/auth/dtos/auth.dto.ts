export class CreateUserInputDTO {
    name!: string;
    birthday!: string
    gender!: string
    password!: string
    email!: string
    clientId!: string
}

export class CreateUserOutputDTO {
    ok: boolean
}

export class LoginInputDTO {
    clientId!: string
    password!: string
}