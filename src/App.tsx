import { createBrowserHistory } from 'history';
import React from 'react';
import { Callback, makeAuthenticator } from 'react-oidc';
import { Switch, Route, Router } from 'react-router-dom';
import MovieDetail from './views/MovieDetail';
import { userManager } from './config/user-manager';
import Layout from './containers/Layout';
import { AuthObject } from './interfaces/auth';
import HomePage from './views/HomePage';
import SearchPage from './views/SeachPage';

const CallBack = Callback as any;

const loading = () => <div className="animated fadeIn pt-3 text-center">Loading...</div>;

const AppWithAuth = makeAuthenticator({
  userManager: userManager,
  placeholderComponent: loading()
})((props) => <Route path="*" render={props => <div>
  <Layout>
    <Route exact path="/" render={() => <HomePage />} />
    <Route path="/search" render={() => <SearchPage />} />
    <Route path="/movie-detail/:id" render={() => <MovieDetail />} />
    <Route path="/favorites" render={() => <h1>fsaavourites</h1>} />
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
                onSuccess={async (user: AuthObject) => {
                  try {
                    console.log(user.profile)
                    window.location.href = '/';
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

