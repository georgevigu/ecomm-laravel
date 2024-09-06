import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FeatureProduct() {
  const [data, setData] = useState([]);

  useEffect(() => { 
    const fetchData = async () => {
      try {
        let result = await fetch("http://localhost:8000/api/list");
        result = await result.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {data.map((product) => (
          <div className="col" key={product.id}> {/* Added a key prop for each item */}
            <div className="card shadow-sm">
              <img 
                className="card-img-top bg-dark cover"
                height="400"
                alt="Product Image"
                src={`http://localhost:8000/${product.file_path}`}
              />
              <div className="card-body">
                <h5 className="card-title text-center">{product.name}</h5>
                <p className="card-text text-center"><b>{product.price}€</b></p>
                <div className="d-grip gap-2">
                  <Link to={`/products/${product.id}`} className="btn btn-outline-dark" replace>
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureProduct;
