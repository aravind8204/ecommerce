import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useCookies } from "react-cookie";
import api from "../services/api";

const AdminContext = createContext();

export const AdminProvider = ({children}) =>{

    const [cookies, setCookie, removeCookie] = useCookies(["token"]);

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [products,setProducts] = useState([]);
    const [users,setUsers] = useState([]);


    const getProducts = async() =>{
        try{
            const res = await api.get("/product/products",{
            headers:{
                    Authorization: `Bearer ${cookies.token}`,
            }
        });
        setProducts(res.data.products);
        }
        catch(err){
            console.log(err);
        }
    }

    const getUsers = async() => {
        try{
            const res = await api.get("/user/users",{
            headers:{
                
                    Authorization: `Bearer ${cookies.token}`,
            }
            });
            setUsers(res.data.users);
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        if(cookies.token){
            setIsLoggedIn(true);
            getProducts();
            getUsers();
        }
        else {
            setIsLoggedIn(false);
        }
    },[products,users]);

    return (
        <AdminContext.Provider value={{
            users,
            products
        }}>
            {children}
        </AdminContext.Provider>
    )
}

export const useAdmin = () => useContext(AdminContext);