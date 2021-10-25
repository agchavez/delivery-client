export interface LoginResponse{
  ok      : boolean;
  msj     : string;
  client? : Client;
  token?  : string;

}

export interface Client {
  _id: string;
  firstName: string;
  lastName: string;
  phone: number;
  email: string;
  status: boolean;
  verified: boolean;
}
