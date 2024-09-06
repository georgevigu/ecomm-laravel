import { Link } from "react-router-dom";
import Footer from '../Footer';
import Header from '../Header';
import ScrollToTopOnMount from "./ScrollToTopOnMount";
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

function ProductDetail() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();

  function getFirstWord(str) {
    return str.split(' ')[0];
  }

  useEffect(() => {
      const fetchData = async () => {
          try {
              let result = await fetch(`http://localhost:8000/api/product/${id}`);
              result = await result.json();
              setName(result.name);
              setPrice(result.price);
              setDescription(result.description);
              setFile(result.file_path);
          } catch (error) {
              console.error("Error fetching data:", error);
          }
      };

      fetchData();
  }, [id]);

  function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProductIndex = cart.findIndex(item => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    alert("Item added to cart")
  }

  return (
    <div>
      <Header />
      <div className="container mt-5 py-4 px-xl-5">
        <ScrollToTopOnMount />
        <nav aria-label="breadcrumb" className="bg-custom-light rounded mb-4">
          <ol className="breadcrumb p-3">
            <li className="breadcrumb-item active" aria-current="page">
              {name}
            </li>
          </ol>
        </nav>
        <div className="row mb-4">
          <div className="col-lg-6">
            <div className="row">
              <div className="col-12 mb-4">
                <img
                  className="border rounded ratio ratio-1x1"
                  alt=""
                  src={`http://localhost:8000/${file}`}
                />
              </div>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="d-flex flex-column h-100">
              <h2 className="mb-1">{name}</h2>
              <h4 className="mb-4"><strong>{price}€</strong></h4>
              <div className="row g-3 mb-4">
                <div className="col">
                  <button
                    className="btn btn-outline-dark py-2 w-100"
                    onClick={() => addToCart({ id, name, price, file })}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
              <h4 className="mb-0">Details</h4>
              <hr />
              <dl className="row">
                <dt className="col-sm-4">Code</dt>
                <dd className="col-sm-8 mb-3">C000{id}</dd>
                <dt className="col-sm-4">Category</dt>
                <dd className="col-sm-8 mb-3">Sneakers</dd>
                <dt className="col-sm-4">Brand</dt>
                <dd className="col-sm-8 mb-3">{getFirstWord(name)}</dd>
                <dt className="col-sm-4">Manufacturer</dt>
                <dd className="col-sm-8 mb-3">{getFirstWord(name)}</dd>
                <dt className="col-sm-4">Status</dt>
                <dd className="col-sm-8 mb-3">In stock</dd>
              </dl>
              <h4 className="mb-0">Description</h4>
              <hr />
              <p className="lead flex-shrink-0">
                <small>{description}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ProductDetail;
