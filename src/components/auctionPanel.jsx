import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';

function AuctionPanel() {
  const [productName, setProductName] = useState("");
  const [productCategory, setProductCategory] = useState("other");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");

  const [filterByProductName, setFilterByProductName] = useState("");
  const [filterByProductCategory, setFilterByProductCategory] = useState("");
  const [filterByMinPrice, setFilterByMinPrice] = useState("");
  const [filterByMaxPrice, setFilterByMaxPrice] = useState("");

  const [products, setProducts] = useState([]);

  function addProduct() {
    setProducts([
      ...products,
      {
        name: productName,
        category: productCategory,
        description: productDescription,
        price: productPrice,
      },
    ]);
    setProductName("");
    setProductCategory("other");
    setProductDescription("");
    setProductPrice("");
  }

  function deleteItem(index) {
    setProducts(products.filter((_, i) => i !== index));
  }

  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLowerCase().includes(filterByProductName.toLowerCase());
    const matchesCategory = filterByProductCategory === "" || product.category === filterByProductCategory;
    const matchesMin = filterByMinPrice === "" || parseFloat(product.price) >= parseFloat(filterByMinPrice);
    const matchesMax = filterByMaxPrice === "" || parseFloat(product.price) <= parseFloat(filterByMaxPrice);
    return matchesName && matchesCategory && matchesMin && matchesMax;
  });

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Welcome to the Auction Platform</h1>

      <div className="row justify-content-center">
        <div className="col-md-6 bg-light p-4 rounded shadow-sm mb-4">
          <h2 className="text-center mb-4">Add Product</h2>
          <form>
            <label>Product Name</label>
            <input type="text" className="form-control mb-2" value={productName} onChange={(e) => setProductName(e.target.value)} />

            <label>Product Category</label>
            <select className="form-control mb-2" value={productCategory} onChange={(e) => setProductCategory(e.target.value)}>
              <option value="other">Other</option>
              <option value="cars">Cars</option>
              <option value="houses">Houses</option>
              <option value="bikes">Bikes</option>
            </select>

            <label>Product Description</label>
            <input type="text" className="form-control mb-2" value={productDescription} onChange={(e) => setProductDescription(e.target.value)} />

            <label>Product Price (PLN)</label>
            <input type="number" className="form-control mb-3" value={productPrice} onChange={(e) => setProductPrice(e.target.value)} />

            <button type="button" className="btn btn-primary w-100" onClick={addProduct}>Add Product</button>
          </form>
        </div>

        <div className="col-md-6 bg-light p-4 rounded shadow-sm mb-4">
          <h2 className="text-center mb-4">Filter Products</h2>
          <form>
            <label>By Name</label>
            <input type="text" className="form-control mb-2" value={filterByProductName} onChange={(e) => setFilterByProductName(e.target.value)} />

            <label>By Category</label>
            <select className="form-control mb-2" value={filterByProductCategory} onChange={(e) => setFilterByProductCategory(e.target.value)}>
              <option value="">All</option>
              <option value="other">Other</option>
              <option value="cars">Cars</option>
              <option value="houses">Houses</option>
              <option value="bikes">Bikes</option>
            </select>

            <label>Min Price</label>
            <input type="number" className="form-control mb-2" value={filterByMinPrice} onChange={(e) => setFilterByMinPrice(e.target.value)} />

            <label>Max Price</label>
            <input type="number" className="form-control mb-2" value={filterByMaxPrice} onChange={(e) => setFilterByMaxPrice(e.target.value)} />
          </form>
        </div>
      </div>

      <div className="row justify-content-center mt-5">
        <div className="col-md-10">
          <h2 className="text-center mb-4">Product List</h2>
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <div key={index} className="card mb-3 shadow-sm">
                <div className="card-body">
                  <h4 className="card-title">{product.name}</h4>
                  <h6 className="card-subtitle mb-2 text-muted">{product.category}</h6>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text fw-bold">{product.price} zł</p>
                  <button className="btn btn-danger" onClick={() => deleteItem(index)}>Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No products match the filters.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuctionPanel;
