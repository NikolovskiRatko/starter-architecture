export interface LoginQuery {
  email: string;
  password: string;
}

export interface UseAuthLoginParams {
  data: LoginQuery;
  remember?: boolean;
  staySignedIn?: boolean;
}

export interface SignUpQuery {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
}

export interface SignUpForm extends SignUpQuery {
  is_terms_and_conditions_agreed: boolean;
}
