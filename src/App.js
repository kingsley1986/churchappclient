import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";


import 'bootstrap/dist/css/bootstrap.min.css';
import PostsList from "./components/posts-list.component";
import PostAndComments from "./components/post-comments.component";
import CreateComments from "./components/post-comments.component";

class App  extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light big-light">
            < a className="navbar-brand" href="/" target="_blank">
              {/* <img src={logo} width="30" height="30" alt="/" /> */}
            </a>

            <Link to="/" className="navbar-brand">Mern-stack To do App</Link>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <Link to="/posts" className="nav-link">Todos</Link>
                </li>
                <li className="navbar-item">
                  <Link to="/create" className="nav-link"> Create Todo</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Route path="/posts" exact component={PostsList} />
          <Route path="/posts/:id/comments" exact component={PostAndComments} />
        </div>
      </Router>
    );
  }
}
export default App;