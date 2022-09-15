import { createBrowserHistory } from 'history';
import React from 'react';
import { Callback, makeAuthenticator } from 'react-oidc';
import { Switch, Route, Router } from 'react-router-dom';
import { userManager } from './config/user-manager';
import Layout from './containers/Layout';

const CallBack = Callback as any;

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const AppWithAuth = makeAuthenticator({
  userManager: userManager,
  placeholderComponent: loading()
})((props) => <Route path="*" render={props => <div>
  <Layout> 
    <Route exact path="/" render={() => <h1>sa</h1>}/>
    <Route path="/trending" render={() => <h1>trending</h1>}/>
    <Route path="/explore" render={() => <h1>explore</h1>}/>
    <Route path="/favourites" render={() => <h1>favourites</h1>}/>
    <Route path="/settings" render={() => <h1>settings</h1>}/>
  </Layout>
</div>} />) as any

export default function App() {

  return (
    <Router history={createBrowserHistory()}>
      <Switch>
        <Route
          path="/callback" render={routeProps =>
            <>
              <div className="animated fadeIn pt-3 text-center">Loading</div>
              <CallBack
                userManager={userManager}
                onSuccess={async (user: any) => {
                  try {
                    console.log(user)
                    routeProps.history.push('/')
                  } catch (e) {
                    console.log(e);
                  }
                }}
                onError={(e: any) => {
                  console.error("onError", e);
                }}
              />
            </>
          }>

        </Route>
        <AppWithAuth />
      </Switch>
    </Router >
  );
}

