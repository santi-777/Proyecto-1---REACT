import React,{useState,useEffect} from "react"
import {Row, Card,Button,Col} from 'react-bootstrap'
import {Link} from "react-router-dom"
import Loading from "./Loading"
function Products1(){
    const [listadoProductos1,setListadoProductos1]=useState([])
    const [loading,setLoading] = useState(true)
    const [buscar,setBuscar] = useState('ipod')
    useEffect(
        ()=>{
            fetch("https://api.mercadolibre.com/sites/MLA/search?q="+buscar)
            .then(res=>res.json())
            .then(data=>{
                setListadoProductos1(data.results)
                setLoading(false)
            })
            .catch(e=>{
                console.log(e)
            })
        },
        [buscar]
    )

    const Busqueda=()=>{
        let dato= document.getElementById("busqueda").value
        console.log(dato)
        if(dato===""){
            setBuscar('ipod')
        }else{
            setBuscar(dato)
        }    
    }

    return(
        <Loading loading={loading}>
            <div className="b">
            <h1 className="prod">Listado Productos</h1>  
            <div className="d">
                <input type="search" id="busqueda" placeholder="Buscar Productos" onKeyPress={Busqueda}/>
                <button className="c" onClick={Busqueda}>Buscar</button>
            </div> 
            
            <Row>
                {listadoProductos1.map(listadoProducto1=>
                    <Col key={listadoProducto1.id}>
                        <Card id="card"  >
                            <Card.Img  variant="top" src={listadoProducto1.thumbnail} id="img"
                            height="275px" />
                            <Card.Body >
                                <Card.Title style={{ maxHeight:"50px", overflow:"auto"}}>{listadoProducto1.title}</Card.Title>
                                <Card.Text>
                                    ${listadoProducto1.price}
                                </Card.Text>
                                <Button className="comprar" variant="primary" as={Link} to={'/product1/'+listadoProducto1.id}>Ver Detalle</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                )}
            </Row>
            </div>
        </Loading>
    )
}
export default  Products1