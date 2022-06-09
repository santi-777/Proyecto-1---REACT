import { useForm } from "react-hook-form";
import React,{useState,useContext} from "react"
import {Link} from "react-router-dom"
import {Form,Button, Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import firebase from '../Config/firebase';
import AuthContext from '../Context/AuthContext'
function Inicio(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alert,setAlert]=useState({variant:'',text:''})
    const context = useContext(AuthContext)
    const loginMessage={
        "auth/user-not-found":"El email no existe",
        "auth/wrong-password":"La contraseña es incorrecta"
    }
    const onSubmit= async (data)=>{
        console.log("Form",data)
        try{
            const responseUser = await firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            console.log("responseUser", responseUser)
            
            if(responseUser.user.uid){
                const userInfo = await firebase.firestore().collection("usuarios")
                .where("userId","==",responseUser.user.uid)
                .get()
                if(userInfo){
                    const nombre = userInfo.docs[0]?.data().name
                    setAlert({variant:"success",text:'Bienvenido! '+(nombre || "")})
                    context.loginUser(true)  
                }
                setInterval(() => {
                    window.open("/products", "_self");
                }, 1000);
            }    
            }
            catch(e){
                console.log(e)
                setAlert({variant:"danger",text:loginMessage[e.code]||"Usuario no encontrado, registrese por favor"})
            }

       
        
    }
    return(
        <div className="a">
            <Alert variant={alert.variant}>{alert.text}</Alert>
            <h1 className="titulo">Datos de Inicio:</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control  type="email" {...register("email", { required: true })}/>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="formBasicPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" {...register("password", { required: true })}/>
                </Form.Group>
                {(errors.password || errors.email ) && <div>Todos los campos son obligatorios</div>}
                <br></br>
                <span><Button type="submit" id="send" variant="primary" >Ingresar</Button></span>
                <span> --o-- </span>
                <span><Button variant="primary" id="send" as={Link} to={"/registrar"}>Registrar</Button></span>
            </Form>
        </div>
    )    
}

export default Inicio