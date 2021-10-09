import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import IsAuth from "./Auth";
import MetaTags from "react-meta-tags";

import { useDispatch, connect } from "react-redux";

import messagesAction from "./redux/actions/messagesAction";
import { getUserData, isLoggedIn } from "./redux/actions/authActions";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Register from "./pages/register/register";
import Logout from "./pages/logout";
import Store from "./pages/store/store";
import Favourites from "./pages/favourites/favourites";
import Search from "./pages/search/search";
import ApiDoc from "./pages/api-doc/api-doc";

import 'bootstrap/dist/css/bootstrap.min.css';
import "./app.css";
import Account from "./pages/account/account";
import CreateShop from "./pages/create-shop/create-shop";
import BookingsList from "./pages/bookings-list/bookings-list";

const App = props => {
  const [loggedIn, setLoggedIn] = useState({ loggedIn: false });
  const [shopOwned, setShpoOwned] = useState({ data: [] });
  const [userData, setUserData] = useState({ data: [] })

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isLoggedIn());
    setLoggedIn({ loggedIn: props.logged_in });
    dispatch(getUserData());
    setUserData({ data: props.user_data });
  }, [dispatch]);

  return (
    <div className="App">
      <MetaTags>
        <title>Bookify</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"></meta>
      </MetaTags>
      <Router>
          <div className="main-frame">

            {/* ✔ */}

            <div className="main-content-container">

              {/* {props.all_messages.map(message => {
                return <Alert message={message[1]} type={message[0]} key={message.id} />
              })} */}

              <Switch>

                {/* Login */}
                <Route exact path="/login" render={(props) => (
                  IsAuth() ? (
                    <Redirect to={{pathname: "/"}} />
                  ) : (
                    <Login {...props}/>
                  )
                )} />

                {/* Register */}
                <Route exact path="/register" render={() => (
                  IsAuth() ? (
                    <Redirect to={{pathname: "/"}} />
                  ) : (
                    <Register />
                  )
                )} />

                {/* Home */}
                {/* <Route exact path="/" render={() => {
                  if (props.logged_in === true) {
                    return <Home />
                  } else {
                    return <Redirect 
                      to={{
                        pathname: "/login",
                      }}
                    />
                  }
                }} /> */}

                {/* Home */}
                <Route exact path="/" render={() => (
                  IsAuth() ? (
                    <Home />
                  ) : (
                    dispatch(messagesAction(["danger", "Please sign in."])),
                    <Redirect 
                      to={{
                        pathname: "/login",
                      }}
                    />
                  )
                )} />

                {/* Search */}
                <Route exact path="/search" render={() => (
                  IsAuth() ? (
                    <Search />
                  ) : (
                    dispatch(messagesAction(["danger", "Please sign in."])),
                    <Redirect 
                      to={{
                        pathname: "/login",
                      }}
                    />
                  )
                )} />

                {/* Store */}
                <Route exact path="/store/:id" render={props => (
                  IsAuth() ? (
                    <Store {...props} />
                  ) : (
                    dispatch(messagesAction(["danger", "Please sign in."])),
                    <Redirect 
                      to={{
                        pathname: "/login",
                      }}
                    />
                  )
                )} />

                {/* Favourites */}
                <Route exact path="/favourites" render={() => (
                  IsAuth() ? (
                    <Favourites />
                  ) : (
                    dispatch(messagesAction(["danger", "Please sign in."])),
                    <Redirect 
                      to={{
                        pathname: "/login",
                      }}
                    />
                  )
                )} />

                {/* Bookings List */}
                <Route exact path="/bookings-list" render={() => (
                  IsAuth() ? (
                    <BookingsList />
                  ) : (
                    dispatch(messagesAction(["danger", "Please sign in."])),
                    <Redirect 
                      to={{
                        pathname: "/login",
                      }}
                    />
                  )
                )} />

                {/* Account */}
                <Route exact path="/account" render={() => (
                  IsAuth() ? (
                    <Account />
                  ) : (
                    dispatch(messagesAction(["danger", "Please sign in."])),
                    <Redirect 
                      to={{
                        pathname: "/login",
                      }}
                    />
                  )
                )} />

                {/* Create Shop */}
                <Route exact path="/create-shop" render={() => (
                  IsAuth() ? (
                    <CreateShop />
                  ) : (
                    dispatch(messagesAction(["danger", "Please sign in."])),
                    <Redirect 
                      to={{
                        pathname: "/login",
                      }}
                    />
                  )
                )} />

                {/* API Doc */}
                <Route exact path="/api-doc" render={ () => <ApiDoc /> } />

                {/* Logout */}
                <Route exact path="/logout" component={Logout} />

              </Switch>
            </div>

            {/* ❌ */}

          </div>
      </Router>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    all_messages: state.msg.messages,
    logged_in: state.auth.logged_in,
    user_data: state.auth.user_data,
    shop_owned: state.shops.shop_owned,
  };
};

export default connect(mapStateToProps)(App);