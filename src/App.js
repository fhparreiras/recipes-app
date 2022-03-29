import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/MyProvider';
import Routes from './routes/Routes';

function App() {
  return (
    <Provider>
      <Routes />
    </Provider>
  );
}

export default App;
