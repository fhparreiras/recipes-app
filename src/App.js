import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import MyProvider from './context/MyProvider';
import Routes from './routes/Routes';

function App() {
  return (
    <MyProvider>
      <Routes />
    </MyProvider>
  );
}

export default App;
