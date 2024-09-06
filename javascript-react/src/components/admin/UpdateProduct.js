import Header from "../Header"
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function UpdateProduct() {
    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState(null)
    const navigate = useNavigate()
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                let result = await fetch(`http://localhost:8000/api/product/${id}`)
                result = await result.json()
                setName(result.name)
                setPrice(result.price)
                setDescription(result.description)
                setFile(result.file_path)
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData()
    }, [id])

    const handleUpdate = async () => {
        const formData = new FormData()
        formData.append("name", name)
        formData.append("price", price)
        formData.append("description", description)
        if (file && typeof file === 'object') { // Ensure file is a file object before appending
            formData.append("file", file)
        }

        try {
            let result = await fetch(`http://localhost:8000/api/update/${id}`, {
                method: "POST",
                body: formData,
            })

            if (result.ok) {
                navigate("/admin")
            } else {
                const errorData = await result.json()
                console.error("Failed to update product", errorData)
            }
        } catch (error) {
            console.error("Error updating product:", error)
        }
    }

    return (
        <div>
            <Header />
            <h1>Update Product</h1>
            <p>Product ID: {id}</p>
            <label htmlFor="name" >Name </label>
            <br />
            <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />{" "}
            <br /> <br />
            <label htmlFor="price" >Price </label>
            <br />
            <input
                type="text"
                name="price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
            />{" "}
            <br /> <br />
            <label htmlFor="description" >Description </label>
            <br />
            <textarea
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />{" "}
            <br /> <br />
            <label htmlFor="file" >Image</label>
            <br />
            <input
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
            />{" "}
            <br /> <br />
            <img style={{width:"200px"}}src={`http://localhost:8000/${file}`} /> <br /> <br />
            <button onClick={handleUpdate} className="btn btn-primary">Update Product</button>
        </div>
    )
}

export default UpdateProduct
