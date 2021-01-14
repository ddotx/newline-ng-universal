export interface User {
  id?: number; // -> backend use in POST /login
  email: string;
  favorite: string[];
}
