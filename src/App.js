import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Navbar from "./components/ui/navbar";

const App = () => {
    return (
        <div className="container">
            <Navbar />
            <Switch>
                <Route path="/login/:type?" component={Login} />
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/" component={Main} />
                <Redirect to="/" />
            </Switch>
        </div>
    );
};

export default App;
