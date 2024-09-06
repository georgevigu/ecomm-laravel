import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Footer from '../Footer';
import { Table } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Cart() {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');

    useEffect(() => {
        const userInfo = localStorage.getItem('user-info');
        if (userInfo) {
            try {
                const parsedUserInfo = JSON.parse(userInfo);
                setName(parsedUserInfo.name || ''); // Set default if name is not available
            } catch (error) {
                console.error("Failed to parse user info:", error);
            }
        }

        const cartData = localStorage.getItem("cart");
        if (cartData) {
            try {
                const parsedData = JSON.parse(cartData);
                setProducts(parsedData);
            } catch (error) {
                console.error("Failed to parse cart data:", error);
            }
        }
    }, []);

    const deleteProduct = (id) => {
        const updatedProducts = products.filter(product => product.id !== id);

        setProducts(updatedProducts);
        localStorage.setItem("cart", JSON.stringify(updatedProducts));
    };

    const handleClick = async () => {
        const order = {
            customer_name: name,
            status: "pending",
            products: products.map(product => ({
                product_id: product.id,
                quantity: product.quantity,
            })),
        };

        try {
            const response = await fetch("http://localhost:8000/api/addorder", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(order),
            });

            if (response.ok) {
                const result = await response.json();
                alert("Order has been placed successfully!");
                localStorage.removeItem("cart");
                setProducts([]);
            } else {
                throw new Error('Failed to place order');
            }
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place order");
        }
    };

    return (
        <div>
            <Header />
            <h1>Cart</h1>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Operations</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product, index) => (
                            <tr key={product.id}>
                                <td>{index + 1}</td>
                                <td>{product.name}</td>
                                <td>${product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <Button onClick={() => deleteProduct(product.id)} variant="danger">Delete</Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="text-center">No items in the cart</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="col-sm-6 offset-sm-3">
                <br />
                <input type="text" className="form-control" placeholder="name"
                />
                <br />
                <input type="text" className="form-control" placeholder="address" 
                />
                <br />
                <input type="text" className="form-control" placeholder="card" 
                />
                <br />
                <input type="text" className="form-control" placeholder="additional info" 
                />
                <br />
                <button onClick={handleClick} className="btn btn-primary">Checkout</button>
                <br /> <br/>
            </div>

            <Footer />
        </div>
    );
}

export default Cart;
