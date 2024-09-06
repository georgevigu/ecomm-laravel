import Header from '../Header'
import React, { useState, useEffect } from 'react'
import { Table } from 'react-bootstrap'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

function ProductList() {
    const [data, setData] = useState([])
    const [orders, setOrders] = useState([])

    useEffect(() => { 
        const fetchData = () => {
            getData()
        }
        
        fetchData()
    }, [])

    useEffect(() => { 
        const fetchData = () => {
            getOrders()
        }
        
        fetchData()
    }, [])

    async function getData() {
        try {
            let result = await fetch("http://localhost:8000/api/list")
            result = await result.json()
            setData(result)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    async function getOrders() {
        try {
            let result = await fetch("http://localhost:8000/api/getallorders")
            result = await result.json()
            setOrders(result)
        } catch (error) {
            console.error("Error fetching data:", error)
        }
    }

    async function deleteOperation(id){
        let result = await fetch("http://localhost:8000/api/delete/" + id, {
            method:"DELETE"
        })
        result = await result.json();
        console.warn(result)
        getData()
    }

    async function deleteOrder(id){
        let result = await fetch("http://localhost:8000/api/deleteorder/" + id, {
            method:"DELETE"
        })
        result = await result.json();
        console.warn(result)
        getData()
    }

    return (    
        <div>
            <Header />
            <h1>Admin panel</h1>
            <h2>Product list</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{product.name}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td><img style={{width:"150px"}} src={`http://localhost:8000/${product.file_path}`} alt="Product image"/></td>
                            <td>
                                <Link to={"/update/"+product.id}>
                                    <Button variant="warning">Update</Button>
                                </Link>
                                <Button onClick={()=>deleteOperation(product.id)} variant="danger">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <h2>Order list</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Products</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{order.customer_name}</td>
                            <td>{order.status}</td>
                            <td>
                                <ul>
                                    {order.products.map((product, i) => (
                                        <li key={i}>{product.name} - Quantity: {product.pivot.quantity}</li>
                                    ))}
                                </ul>
                            </td>
                            <td><Button onClick={()=>deleteOrder(order.id)} variant="danger">Delete</Button></td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    )
}

export default ProductList
