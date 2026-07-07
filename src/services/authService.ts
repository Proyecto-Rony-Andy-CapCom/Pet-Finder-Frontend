import { LoginRequest, AuthResponse } from '../interfaces/auth.interface';

const API_URL = 'http://localhost:8080/api/auth';

export const login = async (credentials: LoginRequest): Promise<AuthResponse> => {
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Credenciales incorrectas o error en el servidor');
  }

  return response.json();
};