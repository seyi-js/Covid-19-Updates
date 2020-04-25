import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import {BrowserRouter as Router} from 'react-router-dom'
import Page from './components/Page';

 const App = () => {

  

  

  return (
    <React.Fragment>
      <Provider store={ store }>
        <Router>
          <Page />
        </Router>
     
      </Provider>
      
    </React.Fragment>
  )
}

export default App;