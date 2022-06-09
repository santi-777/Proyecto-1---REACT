import React,{useState,useEffect} from "react"
import { useForm } from "react-hook-form";
import {Form,Button,Alert} from 'react-bootstrap'
import firebase from "../Config/firebase"
import {useParams} from "react-router-dom"
import {getByIdProductos,update} from "../Service/productsServices"
function ProductsModificar(){
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [alert,setAlert]=useState({variant:'',text:''})
    const {id} = useParams()
    useEffect(
        ()=>{
            const request = async ()=>{
                
                try{
                    const response = await getByIdProductos(id)
                    const a = response.data().title+response.data().price+response.data().description+response.data().condition;
                    const b = a.toLowerCase()+response.data().title.toUpperCase();
                    console.log('response',response)
                    setValue("title",response.data().title)
                    setValue("price",response.data().price)
                    setValue("description",response.data().description)
                    setValue("stock",response.data().stock)
                    setValue("thumbnail",response.data().thumbnail)
                    setValue("condition",response.data().condition)
                    setValue("photo1",response.data().photo1)
                    setValue("photo2",response.data().photo2)
                    setValue("photo3",response.data().photo3)
                    setValue("info",b)
                }catch(e){
                    console.log(e)
                }
                
            }
            request()
        },
        [id,setValue]
    )
    const onSubmit=async (data)=>{
        console.log("Form",data)
        try{
            const document = await update(id,data)
            console.log(document)
        }catch(e){
            console.log(e)
        }
        setAlert({variant:"success",text:'Formulario enviado con exito!'})
            setInterval(() => {
                window.open("/products2", "_self");
        }, 1000); 
        
    }
    const handleDelete = async ()=>{
        const document = await firebase.firestore().doc("productos/"+id)
        .delete()
        console.log(document)
        setAlert({variant:"danger",text:'Prodcuto eliminado con exito!'})
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
                <Form.Group className="mb-3" controlId="formBasicImage">
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
            --o--
            <Button  id="del" variant="danger" onClick={handleDelete}>Eliminar</Button>
            </Form>
        </div>
    )    
    
}

export default ProductsModificar