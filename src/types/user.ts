export interface TUser {
    userId: string;
    name: string;
    email: string;
    isActive?: boolean;
    role: "USER" | "ADMIN" | "SUPER_ADMIN"
    iat?: number;
    exp?: number;
  }