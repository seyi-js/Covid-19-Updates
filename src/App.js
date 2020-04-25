import React from 'react';
import { Provider } from 'react-redux';
import store from './store';

import Page from './components/Page';

 const App = () => {

  

  

  return (
    <React.Fragment>
      <Provider store={ store }>
      <Page />
      </Provider>
      
    </React.Fragment>
  )
}

export default App;