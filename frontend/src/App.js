import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './auth/login';
import './styles/global.css';

import './App.css';
import Index from './Home/index'
import HomeNew from './home_new/HomeNew';
import IndexAdmin from './pages/admin/layout';
import CustomerSignup from './auth/customersignup';
import LoginAdmin from './auth/loginAdmin';
import ProtectedRoute from './components/ProtectedRoute';
import { ForceRenderProv } from './context/forceRenderContext';



function App() {
  return (
    <ForceRenderProv>


      <Router>
      <div className="App">
        <Routes>

            {/* <Route path='/login' element={<Login/>} /> */}
            <Route path='/LoginAdmin' element={<LoginAdmin/>} />
            <Route path='/CustomerSignup' element={<CustomerSignup/>}/>
            <Route path='/home' element={<HomeNew/>} />
            <Route 
              path='/admin/*' 
              element={
                <ProtectedRoute isAdmin={true}>
                  <IndexAdmin/>
                </ProtectedRoute>
              }
            />
            <Route path='*' element={<HomeNew/>} />
        </Routes>
      </div>
      </Router>
      </ForceRenderProv>
  );
}

export default App;
