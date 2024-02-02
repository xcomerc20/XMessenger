import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { hasCookie, getCookie, deleteCookie } from "cookies-next";
import { COOKIES } from "@/lib/constants";
import { useRouter } from "next/router";

interface AuthContextType {
  data: any;
  setData: React.Dispatch<React.SetStateAction<any>>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [data, setData] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (hasCookie(COOKIES.AUTH)) {
      const token = getCookie(COOKIES.AUTH);
      console.log(token, "here");

      if (token) {
        (async () => {
          const promise = await fetch("/api/updates", {
            headers: {
              Authorization: token,
            },
          });
          const res = await promise.json();
          if (res.err) {
            deleteCookie(COOKIES.AUTH);
            console.log("token1", "here");
            router.replace("/");
          } else {
            setData({ ...res, token });
          }
        })();
      } else {
        console.log("token2", "here");
        router.replace("/");
      }
    } else {
      console.log("token3", "here");
      router.replace("/");
    }
  }, []);

  return (
    <AuthContext.Provider value={{ data, setData }}>
      {children}
    </AuthContext.Provider>
  );
};
