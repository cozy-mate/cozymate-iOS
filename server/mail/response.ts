import { Tokens } from '@/type/token';

export interface VerifyMailResponse {
  result: {
    tokenResponseDTO: Tokens;
  };
}
