import Header from "./Header";
import { useState } from 'react';
import { Table } from 'react-bootstrap';
import { Link } from "react-router-dom";

function Search() {
    const [data, setData] = useState([]);

    async function search(key) {
        if (key.trim() === "") {
            setData([]);
            return;
        }

        try {
            let result = await fetch("http://localhost:8000/api/search/" + key);
            if (result.ok) {
                let data = await result.json();
                setData(data);
            } else {
                console.error("Server error:", result.statusText);
                setData([]);
            }
        } catch (error) {
            console.error("Fetch error:", error);
            setData([]);
        }
    }

    return (
        <div>
            <Header />
            <h1>Search Product</h1>
            <div className="col-sm-6 offset-sm-3">
                <br />
                <input type="text" onChange={(e) => search(e.target.value)} className="form-control" placeholder="Search Product" />
                <br />
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
                                <td><img style={{ width: "150px" }} src={`http://localhost:8000/${product.file_path}`} alt="Product" /></td>
                                <td>
                                    <Link to={`/products/${product.id}`} className="btn btn-outline-dark" replace>
                                        Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </div>
    );
}

export default Search;
