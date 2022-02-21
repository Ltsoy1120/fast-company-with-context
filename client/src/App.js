import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./layouts/login";
import Users from "./layouts/users";
import Main from "./layouts/main";
import Navbar from "./components/ui/navbar";
import { ToastContainer } from "react-toastify";
import { ProfessionProvider } from "./hooks/useProfession";
import { QualityProvider } from "./hooks/useQuality";
import { AuthProvider } from "./hooks/useAuth";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";

// ссылка на документацию farebase https://firebase.google.com/docs/reference/rest/database

const App = () => {
    return (
        <div>
            <AuthProvider>
                <Navbar />

                <QualityProvider>
                    <ProfessionProvider>
                        <Switch>
                            <ProtectedRoute
                                path="/users/:userId?/:edit?"
                                component={Users}
                            />
                            <Route path="/login/:type?" component={Login} />
                            <Route path="/logout" component={LogOut} />
                            <Route path="/" exact component={Main} />
                            <Redirect to="/" />
                        </Switch>
                    </ProfessionProvider>
                </QualityProvider>
            </AuthProvider>

            <ToastContainer />
        </div>
    );
};

export default App;
