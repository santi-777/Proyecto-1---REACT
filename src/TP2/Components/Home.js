import {Button} from 'react-bootstrap'
import React,{useContext, useEffect} from "react"
import AuthContext from '../Context/AuthContext'
import {useNavigate} from "react-router-dom"
function Home(){
    const context = useContext(AuthContext)
    console.log(context)
    const navigate = useNavigate()
    useEffect(()=>{
        context.neutral()
    });
    
    const ir1=()=>{
       context.activeApi()
       context.activeFire()
       navigate("/products1")
    }
    const ir2=()=>{
        context.activeFire()
        context.activeApi()
        navigate("/products2")
    }
    return(
        <div className="e">
            <h1 className="f">Iniciar con:</h1>
            <br></br>
            <br></br>
            <div className="g">
                <span><Button id="send" variant="primary" onClick={ir2}>Firebase</Button></span>
                <span> --o-- </span>
                <span><Button variant="primary" id="send" onClick={ir1}>Api-rest</Button></span>
            </div>
              
        </div>
    )
}
export default Home