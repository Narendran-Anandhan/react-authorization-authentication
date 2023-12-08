import React from 'react';
import { BrowserRouter as Router, UNSAFE_useRouteId} from 'react-router-dom'
import Base from './Base/index'
import User from './Base/user'
import Admin from './Base/admin'
import { createBrowserHistory as createHistory } from "history";


function App() {
  const history = createHistory();

  return (
    <>
     <Router basename="/" history={history}>
        <Base />
    </Router>
    <Router basename="/admin" history={history}>
        <Admin />
    </Router>
    <Router basename="/user" history={history}>
        <User />
    </Router>
    </>
   


  );
}

export default App;
