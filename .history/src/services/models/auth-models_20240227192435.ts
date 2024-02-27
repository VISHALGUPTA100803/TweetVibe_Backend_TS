export interface UserCreationParams { // nput to our /register endpoint
    email: string;
    name: string;
    username: string;
    password: string;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    username: string;
  }
  
  export interface UserAndCredentials { // output will be UserAndCredentials.
    user: User;
    token: string;
    refresh: string;
  }