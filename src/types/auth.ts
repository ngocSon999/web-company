// types/auth.ts
export interface LoginResponse {
  message: string;
  token: string;
  customer: {
    id: number;
    name: string;
    email: string;
    phone?: string | null;
    address?: string | null;
    image?: string | null;
    company_id: number;
  };
}
