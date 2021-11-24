export interface LoginResponse{
  ok      : boolean;
  verified? : boolean;
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

export interface Category {
  _id: string;
  name: string;
  imgUrl: string;
}

export interface RegisterClient {
  msj: string,
  id: string,
  client: Client,
}