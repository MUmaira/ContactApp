import React from 'react';
import './App.css';
import {BrowserRouter,  Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import AddEdit from './pages/AddEdit';
import View from './pages/View';
import About from './pages/About';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Login from './pages/login';
//import SideBar from './components/SideBar';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Header/>
      {/*<SideBar/>*/}
      <ToastContainer position='top-center' />
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route path='/login' Component={Login} />
        <Route path='/add' Component={AddEdit} />
        <Route path='/update/:id' Component={AddEdit} />
        <Route path='/view/:id' Component={View} />
        <Route path='/about' Component={About} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
