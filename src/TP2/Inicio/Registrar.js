import { useForm } from "react-hook-form";
import React,{useState} from "react"
import {Form,Button,Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import firebase from '../Config/firebase';
function Registrar(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alert,setAlert]=useState({variant:'',text:''})
    const onSubmit= async (data)=>{
        console.log("Form",data)
        
        if(data.password1!==data.password2){
            setAlert({variant:"danger",text:'No es la misma contraseña'}) 
        }
        else{
            try{
            const responseUser = await firebase.auth().createUserWithEmailAndPassword(data.email, data.password1)
            console.log("responseUser",responseUser)
            if(responseUser.user.uid){
                const document = await firebase.firestore().collection("usuarios")
                .add({
                    name:data.nombre,
                    lastname:data.apellido,
                    number:data.telefono,
                    userId:responseUser.user.uid
                })
                console.log("document",document)
            }
            }catch(e){
                console.log(e)
            }
            setAlert({variant:"success",text:'Formulario enviado con exito!'})
            setInterval(() => {
                window.open("/inicio", "_self");
            }, 1000);  
        }
    }
    return(
        <div className="a">
            
            <h1 className="titulo">Datos de Registro:</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="form">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" {...register("nombre", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" {...register("apellido", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" {...register("email", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNumber">
                    <Form.Label>Telefono</Form.Label>
                    <Form.Control type="number"  {...register("telefono", { required: true })}/>
                </Form.Group>
                 <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control id="password1Id" type="password" {...register("password1", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label>Confirmar Password</Form.Label>
                    <Form.Control  id="password2Id" type="password" {...register("password2", { required: true })}/>
                </Form.Group>
                {(errors.password1 || errors.password2 || errors.nombre || errors.apellido || errors.email || errors.telefono) && <Alert variant="danger">Todos los campos son obligatorios</Alert>}
                <Alert variant={alert.variant}>{alert.text}</Alert>
                <Button type="submit" id="send" variant="primary">Registrarme</Button>
            </Form>
            
        </div>
    )    
    
}

export default Registrar