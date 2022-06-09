import React,{useState,useEffect} from "react"
import {useParams} from "react-router-dom"
import {Button, Carousel, Alert, Container, Row, Col} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import Loading from "./Loading"
import AuthContext from '../Context/AuthContext'
function Detalle1(){
    const {id} = useParams()
    const [product,setProducto] = useState({})
    const [loading,setLoading] = useState(true)
    const [estado,setEstado]=useState("")
    const [cantidad,setCantidad]=useState("")
    useEffect(
        ()=>{
            const request = async ()=>{
                try{
                    setLoading(true)
                    
                    const resault = await fetch("https://api.mercadolibre.com/items/"+id)
                    const response = await resault.json()
                    setProducto(response)
                    setCantidad(response.available_quantity)
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
                       <>
                        {product.tags?.map((dato,index)=>{
                            return(
                                <li key={index}>
                                    Tags descriptivo: "{dato}"
                            </li>)
                        })} 
                        </>  
                    </div>
                </Col>
                <Col sm={4} className="imagen" >
                    <Carousel variant="dark">
                        {product.pictures?.map((imagenes,index)=>
                            <Carousel.Item key={index}>
                                <img
                                    className="d-block w-100"
                                    src={imagenes.url}
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

export default Detalle1
