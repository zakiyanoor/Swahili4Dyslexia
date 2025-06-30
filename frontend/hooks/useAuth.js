import { useContext } from "react";
// import { AuthContext } from "../context/AuthContext";
import { AuthContext } from "../src/context/AuthContext";


function useAuth() {
  const { isAuth, setIsAuth, isLoading, user } = useContext(AuthContext);
  return {
    isAuth,
    setIsAuth,
    isLoading,
    role: user?.role || null
  };
}

export default useAuth;
