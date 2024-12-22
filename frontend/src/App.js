import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NoPage from './pages/NoPage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Editor from './pages/Editor';
import { useEffect } from 'react';
import About from './pages/About';
import HomeFinal from './pages/HomeFinal';
import Service from './pages/Service';

function App() {

  return (
   <>
    <Routes>
      <Route path='/' element = {<HomeFinal/>}/>
      <Route path='/dashboard' element = {<Home/>}/>
      <Route path='/about' element = {<About/>}/>
      <Route path='/service' element = {<Service/>}/>
      <Route path='/signup' element = {<SignUp/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/editor/:projectID' element = {<Editor/>}/>
      <Route path='*' element = {<NoPage/>}/>
    </Routes>
   </>
  );
}

export default App;
