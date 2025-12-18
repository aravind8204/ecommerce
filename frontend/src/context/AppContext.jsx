import React, { createContext, useContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import {useNavigate} from "react-router-dom";
import api from "../services/api";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [user,setUser] = useState({});

  const navigate = useNavigate();

  const login = async (email,password) =>{
    try{
      const user = await api.post("/user/login",{email,password});
      alert(user.data.message);
      setCookie("token",user.data.token,{ path: '/' });
      console.log(user.data.token);
      setIsLoggedIn(true);
    }catch(err){
      console.log(err);
    }
  }

  const logout = () =>{
    removeCookie("token", { path: "/" });
    setUser({});
    setIsLoggedIn(false);
    navigate("/");
  }

  const signup = async (name,email,mobileNumber,password)=>{
    try{
      const user = await api.post("/user/create",{name,email,mobileNumber,password});
      
    }catch(err){
      console.log(err);
    }
  }

  const getUser = async()=>{
    try{
      const user = await api.get("/user/getuser",{
        headers:{
          'Authorization':`Bearer ${cookies.token}`
        }
      });
      setUser(user.data.user);
    }catch(err){
      console.log(err);
    }
  }

  const sendOtp = async({email})=>{
    try{
      const user = await api.post("/user/sendotp",{email:email});
      if(user.status==200){
        alert("Otp sent successfully");
      }
    }catch(err){
      console.log(err)
    }
  }


  useEffect(()=>{
    if(cookies.token){
      setIsLoggedIn(true);
      getUser();
    }
    else{
      setIsLoggedIn(false);
    }
  },[cookies.token]);

  return (
    <AppContext.Provider
      value={{
        login,
        isLoggedIn,
        logout,
        navigate,
        signup,
        user,
        sendOtp
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

/* ---------- CUSTOM HOOK ---------- */
export const useApp = () => useContext(AppContext);
