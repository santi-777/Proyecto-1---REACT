import React,{useState,useEffect} from "react"
import {Row, Card,Button,Col} from 'react-bootstrap'
import {Link} from "react-router-dom"
import {getAllProductos} from "../Service/productsServices"
import Loading from "./Loading"
import AuthContext from '../Context/AuthContext'
function  Products2(){
    const [listadoProductos2,setListadoProductos2]=useState([])
    const [loading,setLoading] = useState(true)
    const [buscar,setBuscar] = useState('')
    useEffect(
        ()=>{
            const request = async ()=>{
                try{
                    setLoading(true)
                    const response = await getAllProductos(buscar)
                    console.log('response',response)
                    setListadoProductos2(response)
                    setLoading(false)
                }catch(e){
                    console.log(e)
                    setLoading(false)
                }
            }
            request()
        },
        [buscar]
    )

    const Busqueda=(event)=>{
        const value = event.target.value
        setBuscar(value)
    }
    return(
        <>
            <AuthContext.Consumer>{context=>
                <div className="b">
                    <h1 className="prod">Listado Productos</h1>
                    <div className="d">
                        <input type="search" id="busqueda" placeholder="Buscar Productos" onChange={Busqueda}/>
                        <button className="c" onClick={Busqueda}>Buscar</button>
                    </div>
                    <Loading loading={loading}>
                        <Row >
                            {listadoProductos2.map(listadoProducto2=>
                                <Col key={listadoProducto2.id}> 
                                    <Card id="card">
                                        <Card.Img  variant="top" src={listadoProducto2.data().thumbnail} id="img"
                                        height="225px"/>
                                        <Card.Body>
                                            <Card.Title style={{ maxHeight:"50px", overflow:"auto"}}>{listadoProducto2.data().title}</Card.Title>
                                            <Card.Text>
                                                ${listadoProducto2.data().price}
                                            </Card.Text>
                                            <Button className="comprar" variant="primary" as={Link} to={'/product2/'+listadoProducto2.id}>Ver Detalle</Button>
                                            {
                                                context.userLogin &&
                                                <Button  variant="secondary" as={Link} to={'/products/modificar/'+listadoProducto2.id}>Modificar</Button>
                                            }
                                        </Card.Body>
                                        </Card>
                                </Col>
                            )} 
                        </Row>
                    </Loading>
                </div>
            }</AuthContext.Consumer>
        </>        
    )    
}
export default  Products2