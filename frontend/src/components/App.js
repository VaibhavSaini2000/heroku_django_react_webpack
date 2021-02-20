import React, { Component } from "react";
import "../App.css";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import { ThemeProvider } from "@material-ui/core/";
import theme from "../utils/theme";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NavBar from "./navbar/Navbar";
import Dashboard from "./dashboard/Dashboard";
import Footer from "./footer/Footer";
import AuthModal from "./modals/AuthModal";

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}> 
        <ThemeProvider theme={theme}>
            <div className="App">
                <CssBaseline />
                <div className="wrapper">
                <NavBar />
                <Container maxWidth="lg" className="content">
                    <Dashboard />
                </Container>
                <Footer />
                </div>
                <AuthModal />
            </div>
        </ThemeProvider>
      </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));