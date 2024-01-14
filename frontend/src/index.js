import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { UserContext } from "./context/UserContext";
import { UsersContext } from './context/UsersContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserContext>
      <UsersContext>
        <App />
      </UsersContext>
    </UserContext>
  </React.StrictMode>
);