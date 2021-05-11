import { RootState } from '../../store';
import { AuthState } from './authSlice';

const authSelector = (state: RootState): AuthState => state.auth;

export { authSelector };
