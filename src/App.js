import React from 'react';
import './App.css';
import { ContentExplorer } from 'box-ui-elements';
import {IntlProvider} from 'react-intl';
import {boxAppSettings, redirectUri} from './config.json';

class App extends React.Component {
  state = {
    token: null,
    refresh_token: null,
    authenticateUrl:`https://account.box.com/api/oauth2/authorize/?client_id=${boxAppSettings.clientID}&response_type=code&redirect_uri=${redirectUri}`
  }
  componentDidMount() {
    const redirected = window.location.href.split('?');
    let code;
    if (redirected[1]) {
      code = redirected[1].split('=')[1];
    } else if (!this.state.token) {
      window.location.assign(this.state.authenticateUrl);
    }
    if (code && !this.state.token) {
      let formdata = new FormData();
      formdata.append("grant_type", "authorization_code");
      formdata.append("client_id", boxAppSettings.clientID);
      formdata.append("client_secret", boxAppSettings.clientSecret);
      formdata.append("assertion", "assertion");
      formdata.append("code", code);

      let requestOptions = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
      };

    fetch("https://api.box.com/oauth2/token/", requestOptions)
      .then(response => response.json())
      .then(result => {
        this.setState({
          token: result.access_token,
          refresh_token: result.refresh_token
        })
        window.history.replaceState({}, document.title,'/');
      })
      .catch(error => console.log('error', error));
    }
  };
  render () {
    if (this.state.token) {
      return (
        <div className="App">
          <IntlProvider locale="en">
          <ContentExplorer
          accessToken={this.state.token}
          />
          </IntlProvider>
        </div>)
    } else {
      return <h3> Connecting to Box UI...</h3>
    }
    
  }
}

export default App;
