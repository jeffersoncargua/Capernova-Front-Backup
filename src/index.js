import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { ScrollToTop } from './components';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


import 'react-loading-skeleton/dist/skeleton.css';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <ScrollToTop />
        <ToastContainer closeButton={false} position={'bottom-right'} autoClose={4000} />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
