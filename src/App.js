import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Home from './pages/home';
import RegistrationForm from './pages/userRegister';
import CompanyHome from './pages/companyHome';
import AddInternshipForm from './pages/internshipform';
import InternshipDetailsPage from './pages/internshipDetails';
import UserHome from './pages/userHome';
import CompanyDetailsPage from './pages/internshipDetails copy';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/chome" element={<CompanyHome />} />
        <Route path="/uhome" element={<UserHome />} />
        <Route path="/int" element={<AddInternshipForm />} />
        <Route path="/internships/details" element={<InternshipDetailsPage />} />
        <Route path="/companies/details" element={<CompanyDetailsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
