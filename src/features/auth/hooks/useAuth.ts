import { useContext } from 'react';

import { AuthContext, AuthContextProps } from '../context/AuthProvider';

const useAuth = () => {
  const context = useContext<AuthContextProps>(AuthContext);

  if (context === undefined) {
    throw new Error('"AuthContext" was not provided');
  }

  return context;
};

export default useAuth;
