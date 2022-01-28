import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Navbar from "./components/ui/navbar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";

// ссылка на документацию farebase https://firebase.google.com/docs/reference/rest/database

const App = () => {
    return (
        <div className="container">
            <Navbar />
            <QualityProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route path="/login/:type?" component={Login} />
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/" component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionProvider>
            </QualityProvider>
            <ToastContainer />
        </div>
    );
};

export default App;
