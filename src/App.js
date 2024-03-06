import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Auth from './components/Auth';
import { Routes,Route } from 'react-router-dom';
import RoomsPage from './pages/RoomsPage';
import Rooms from './pages/Rooms';
import PartnerAccount from './pages/PartnerAccount';
import PartnerLogin from './pages/PartnerLogin';
import ListProperty from './pages/ListProperty';
import Order from './pages/Order';
import AdminHome from './pages/AdminHome';
import CustomersDetails from './pages/CustomersDetails';
import MyProperties from './pages/MyProperties';
import Category from './pages/Category';
import Contact from './pages/Contact';


function App() {
  return (
    <div className="App">
    <Header/>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Auth/>}></Route>
        <Route path='/rooms' element={<RoomsPage/>}></Route>
        <Route path='/register' element={<Auth register/>}></Route>
        <Route path='/rooms/:id' element={<Rooms/>}></Route>
        <Route path='/account' element={<PartnerAccount/>}></Route>
        <Route path='/partnerlogin' element={<PartnerLogin/>}></Route>
        <Route path='/listproperty' element={<ListProperty/>}></Route>
        <Route path='/order'  element={<Order/>} ></Route>
        <Route path='/admin'  element={<AdminHome/>} ></Route>
        <Route path='/customer'  element={<CustomersDetails/>} ></Route>
        <Route path='/myproperty'  element={<MyProperties/>} ></Route>
        <Route path='/category/:cat'  element={<Category/>} ></Route>
        <Route path='/contact'  element={<Contact/>} ></Route>

      </Routes>
    <Footer/>
    </div>
  );
}

export default App;
