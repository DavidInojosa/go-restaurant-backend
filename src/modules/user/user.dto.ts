export class UserDTO {
  id?: string;
  email: string;
  username: string;
  password: string;
  role: string;
}

export class UserAuthDTO {
  email: string;
  password: string;
}
