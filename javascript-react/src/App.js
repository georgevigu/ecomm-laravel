import logo from './logo.svg';
import './App.css';
import { Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Login from './components/admin/Login'
import Register from './components/admin/Register'
import Cart from './components/template/Cart'
import AddProduct from './components/admin/AddProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import Protected from './components/admin/Protected'
import ProductList from './components/admin/ProductList'
import Search from './components/Search'
import ProductDetail from './components/template/ProductDetail'
import Main from './components/Main'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <h1>Ecomm Project</h1> */}
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add" element={
            <div>
              <Protected Cmp={AddProduct}/>
              {/* <AddProduct /> */}
            </div>
          } />
          <Route path="/admin" element={
            <div>
              <Protected Cmp={ProductList}/>
              {/* <AddProduct /> */}
            </div>
          } />
          <Route path="/update/:id" element={
            <div>
              <Protected Cmp={UpdateProduct}/>
              {/* <UpdateProduct /> */}
            </div>} />
          <Route path="/products/:id" element={
            <div>
              <Protected Cmp={ProductDetail}/>
              {/* <UpdateProduct /> */}
            </div>} />
          <Route path="/search" element={
            <div>
              <Protected Cmp={Search}/>
              {/* <Search /> */}
            </div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
