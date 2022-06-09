import React,{useState} from "react"
import AuthContext from "./AuthContext"
import {useNavigate} from "react-router-dom"
function AuthProvider(props){
    const [fire,setFire] = useState(localStorage.getItem("fire")||false)
    const [api,setApi] = useState(localStorage.getItem("api")||false)
    const [userLogin,setUserLogin] = useState(localStorage.getItem("login")||false)
    const navigate = useNavigate()
    const activeFire=()=>{
        setFire(true)
        localStorage.setItem("fire",true)
        setApi(false)
        localStorage.removeItem("api")
    }
    const activeApi=()=>{
        setApi(true)
        localStorage.setItem("api",true)
        setFire(false)
        localStorage.removeItem("fire")
    }
    const neutral =()=>{
        setFire(false)
        setApi(false)
        localStorage.removeItem("fire")
        localStorage.removeItem("api")
    }
    const loginUser = (userInfo)=>{
        setUserLogin(true)
        localStorage.setItem("login",true)
    }
    const logoutUser = ()=>{
        setUserLogin(false)
        localStorage.removeItem("login")
        navigate("/")
    }
    return(
        <AuthContext.Provider
            value={{
                fire,
                userLogin,
                api,
                activeFire,
                loginUser,
                logoutUser,
                activeApi,
                neutral
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthProvider