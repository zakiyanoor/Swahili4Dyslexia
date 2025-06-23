import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";

function useAuth() {
  const { isAuth, setIsAuth, isLoading } = useContext(AuthContext);
  return { isAuth, setIsAuth, isLoading };
}

export default useAuth;
