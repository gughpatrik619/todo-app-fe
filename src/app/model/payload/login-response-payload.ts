export interface LoginResponsePayload {
  email: string;
  expiresAt: Date;
  id: string;
  jwtToken: string;
  refreshToken: string;
  roles: string[];
  type: string;
  username: string;
}
