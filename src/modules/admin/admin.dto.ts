export class AdminDTO {
  id?: string;
  email: string;
  username: string;
  password: string;
}

export class IAuthenticateAdmin {
  username: string;
  password: string;
}
