import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AutosProvider } from "./context/AutosContext";
import { AutoLoader } from "./loaders/AutoLoader";
import { TestimoniosProvider } from "./context/TestimoniosContext";
import { TestimoniosLoader } from "./loaders/TestimoniosLoader";
import { AuthProvider } from './context/AuthContext';
import { UsuarioProvider } from './context/UsuarioContext';
import { UsuarioLoader } from './loaders/UsuarioLoader';
import { SucursalProvider } from './context/SucursalContext';
import { SucursalLoader } from './loaders/SucursalLoader';
import { CarritoProvider } from "./context/CarritoContext";
import { OrdenesProvider } from "./context/OrdenesContext";
import { CarritoLoader } from "./loaders/CarritoLoader"; 
import { ContactoProvider }  from "./context/ContactoContext";
import { CitaProvider } from './context/CitaContext';
import { ClienteProvider } from './context/ClienteContext';
import { ClienteLoader } from "./loaders/ClienteLoader";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 <AutosProvider>
    <TestimoniosProvider>
      <CarritoProvider>
        <UsuarioProvider>
          <SucursalProvider>
            <OrdenesProvider>
              <AutoLoader />
                <TestimoniosLoader />
                <UsuarioLoader />
                  <SucursalLoader />
                  <ContactoProvider>
                <AuthProvider>
                  <CarritoLoader />
                  <CitaProvider>
                     <ClienteProvider>
                        <ClienteLoader />
                          <App />
                    </ClienteProvider>
                </CitaProvider>
              </AuthProvider>
              </ContactoProvider>
            </OrdenesProvider>
          </SucursalProvider>
        </UsuarioProvider>
      </CarritoProvider>
    </TestimoniosProvider>
  </AutosProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
