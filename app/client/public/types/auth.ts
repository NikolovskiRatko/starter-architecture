/**
 * Normalised identity payload returned by GET /api/auth/me.
 * Matches the AuthMeDTO shape on the Laravel side.
 */
export interface AuthMe {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  avatar_thumbnail: string | null;
  roles: string[];
  permissions: string[];
  contexts: {
    admin: boolean;
    public: boolean;
  };
  token_type: 'sanctum-pat' | 'cookie';
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
