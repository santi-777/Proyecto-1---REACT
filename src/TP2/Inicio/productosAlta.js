import { useForm } from "react-hook-form";
import React,{useState} from "react"
import {Form,Button,Alert} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import firebase from '../Config/firebase';
function ProductosAlta(){
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [alert,setAlert]=useState({variant:'',text:''})
    const onSubmit=async (data)=>{
        console.log("Form",data)
        const a = data.title+data.price+data.description+data.condition;
        const b = a.toLowerCase()+data.title.toUpperCase();
        try{
            const document = await firebase.firestore().collection("productos") 
            .add({
                info:b,
                title:data.title,
                price:data.price,
                description:data.description,
                thumbnail:data.thumbnail,
                stock:data.stock,
                condition:data.condition,
                photo1:data.photo1,
                photo2:data.photo2,
                photo3:data.photo3 
            })
            console.log(document)
        }catch(e){
            console.log(e)
        }
        setAlert({variant:"success",text:'Formulario enviado con exito!'})
            setInterval(() => {
                window.open("/products2", "_self");
            }, 1000); 
    }
    return(
        <div className="a">
            <h1 className="titulo">Datos de Productos:</h1>
            <Form onSubmit={handleSubmit(onSubmit)} className="form">
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" {...register("title", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPrice">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control type="number" {...register("price", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicNumber">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" {...register("stock", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicimage">
                    <Form.Label>Thumbnail</Form.Label>
                    <Form.Control type="text" {...register("thumbnail", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Condicion</Form.Label>
                    <Form.Control type="text" {...register("condition", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Imagen 1</Form.Label>
                    <Form.Control type="text" {...register("photo1", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Imagen 2</Form.Label>
                    <Form.Control type="text" {...register("photo2", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicImage">
                    <Form.Label>Imagen 3</Form.Label>
                    <Form.Control type="text" {...register("photo3", { required: true })}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Label>Descripcion</Form.Label>
                    <Form.Control as="textarea" rows={3} {...register("description", { required: true })}/>
                </Form.Group>
                {(errors.photo1 || errors.title || errors.price || errors.description || errors.stock || errors.condition || errors.thumbnail) && <Alert variant="danger">Todos los campos son obligatorios</Alert>}
                <Alert variant={alert.variant}>{alert.text}</Alert>
                <Button type="submit" id="send" variant="primary">Guardar</Button>
            </Form>
        </div>
    )    
    
}

export default ProductosAlta