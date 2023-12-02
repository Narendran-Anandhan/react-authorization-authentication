import React from 'react';
import { BrowserRouter as Router, UNSAFE_useRouteId} from 'react-router-dom'
import Base from './Base/index'
import User from './Base/user'

function App() {
  return (
    <>
     <Router basename="/">
        <Base />
    </Router>
    <Router basename="/admin">
        <User />
    </Router>
    </>
   


  );
}

export default App;
