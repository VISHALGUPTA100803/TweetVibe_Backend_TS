export default interface AuthenticatedUser {
    id: string;
    email: string;
    jti: string;
    iss: string; // The "iss" claim identifies the entity that issued the JWT.
  }