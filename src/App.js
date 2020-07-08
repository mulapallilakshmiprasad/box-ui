import React from 'react';
import './App.css';
import { ContentExplorer } from 'box-ui-elements';
import {IntlProvider} from 'react-intl';

function App() {
  return (
    <div className="App">
      <IntlProvider locale="en">
      <header className="App-header">
        <ContentExplorer
        fileId={0}
        token={'bZLtlgnUia4v39zXJUoxpU9zjyYJAjzz'}
        />
      </header>
      </IntlProvider>
    </div>
  );
}

export default App;
