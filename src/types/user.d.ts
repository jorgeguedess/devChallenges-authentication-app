export interface User {
  id?: string;
  name: string;
  email: string;
  password?: string;
  bio?: string;
  phone?: string;
  photoURL?: string;
  media?: File;
}
