// export interface Student {
//   sno: number;
//   sname: string;
//   saddress: string;
//   fees: number;
//   addDate: string;
//   // addDate?: string;
//   lastModifiedDate: string;
//   email?: string;
// }
export interface Student {
  sno: number;
  sname: string;
  saddress: string;
  fees: number;
  email: string;
  addDate: string;
  lastModifiedDate: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface StudentResponse {
  success: boolean;
  message: string;
  data?: Student[];
}
