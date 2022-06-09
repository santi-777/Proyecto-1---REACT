import React,{useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import {Button, Carousel, Alert, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import {getByIdProductos} from "../Service/productsServices"
import Loading from "./Loading"
import AuthContext from '../Context/AuthContext'
function Detalle2(){

    
    const {id} = useParams()
    const [product,setProducto] = useState({})
    const [pictures,setPictures] = useState([])
    const [loading,setLoading] = useState(true)
    const [estado,setEstado]=useState("")
    const [cantidad,setCantidad]=useState("")
    useEffect(
        ()=>{
            const request = async ()=>{
                try{
                    setLoading(true)
                    const response1 = await getByIdProductos(id)
                    console.log('response',response1)
                    const imagenes = [response1.data().photo1,response1.data().photo2,response1.data().photo3]
                    setPictures(imagenes)
                    setCantidad(response1.data().stock)
                    setProducto(response1.data())
                    setLoading(false)
                }catch(e){
                    console.log(e)
                    setLoading(false)
                }
            }
            request()
        },
        [id]
    )

    const comprar=()=>{
        if(cantidad >0){
            setEstado("Gracias por su compra!")
            setCantidad(cantidad-1)
        }else{
            setEstado("Sin Stock")
        } 
    }

        return(
            <>
            <AuthContext.Consumer>{context=>
            <Loading loading={loading}>
            <Container className="b" >
                <h1 className="prod" >{product.title}</h1>
                <Row>
                    <Col sm={8} className="descripcion" >
                    <label>Descripcion: </label>
                    <div>
                        <li>Condicion: {product.condition}</li>
                    
                    <li>{product.description}</li>
                    </div>
                </Col>
                <Col sm={4} className="imagen" >
                <Carousel variant="dark">
                        {pictures.map(imagenes=>
                            <Carousel.Item key={imagenes}>
                                <img
                                    className="d-block w-100"
                                    src={imagenes}
                                    width="225px"
                                    height="300px"
                                    alt="imagenes"
                                />
                            </Carousel.Item>
                        )}
                </Carousel>
                </Col>
                </Row>
                <Row className="precio">
                        <label>$ {product.price}</label>
                        <span></span>
                    </Row>
                    <Row className="cant">
                        <label>Cantidad disponible: {cantidad}</label>
                        <span></span>
                    </Row>
                {context.userLogin &&
                    <Button id="comprar" onClick={comprar} variant="primary">Comprar</Button>
                }
                <Alert className="estado" variant="warning">{estado}</Alert>
            </Container>
        </Loading>
        }</AuthContext.Consumer>
        </>
    )
}

export default Detalle2
