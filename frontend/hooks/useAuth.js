import { useState, useEffect } from "react";
import { getSocket,connectSocket } from "./sockets";

function useAuth() {
  const [isAuth, setIsAuth] = useState(false);
  const [username, setUsername] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   const isAuthenticated =localStorage.getItem("isAuthenticated")
    if (isAuthenticated){
        setIsAuth(isAuthenticated)
    }
  
  }, []);

  return { isAuth, isLoading, username };
}

export default useAuth;
