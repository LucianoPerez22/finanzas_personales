import React, { useContext } from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';


//Variable de Entorno
import { BACKEND } from './const/backend'
//Context
import {DataContext} from './context/DataConext';


//Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Components
import Login from './components/Login';
import Main from './components/Main';
import CategoryNew from './components/CategoryNew'
import CategoryAdmin from './components/CategoryAdmin'
import finanzasAdd from './components/finanzas/FinanzasAdd'
import FinanzasAdmin from './components/finanzas/FinanzasAdmin';

 {/*  <Login /><Main /> */ }
function App() {
  const { user, modalRegister } = useContext(DataContext) 
  console.log(BACKEND)
  
  return (
        <Router>
          
            <div className="container">
            
              { 
                user.nombre === '' ? <Redirect  to="/" /> : <Redirect  to="/main" />
              }

              <Switch>
                <Route exact path="/" exact component={Login} />
                <Route exact path="/main" exact component={Main} />
                <Route exact path="/categoryNew" exact component={CategoryNew} />
                <Route exact path="/categoryList" exact component={CategoryAdmin} />
                <Route exact path="/finanzasAdd" exact component={finanzasAdd} />
                <Route exact path="/finanzasAdmin" exact component={FinanzasAdmin} />
              </Switch>
              
            </div> 
        </Router>
  );
}

export default App;
