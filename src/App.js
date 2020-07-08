import React from 'react';
import './App.css';
import { ContentExplorer } from 'box-ui-elements';
import {IntlProvider} from 'react-intl';

function App() {
  return (
    <div className="App">
      <IntlProvider locale="en">
        <ContentExplorer
        fileId={0}
        token={'BGU0BKHGoTC5ldSGkYmGmJfRQBzpdMgy'}
        />
      </IntlProvider>
    </div>
  );
}

export default App;
