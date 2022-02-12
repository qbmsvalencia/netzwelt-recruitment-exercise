import { useContext, useEffect, useState } from "react";
import {
    BrowserRouter,
    Link,
    Navigate,
    Outlet,
    Routes,
    Route,
    RouteProps,
} from "react-router-dom";
import Home from "./pages/Home";
import React from "react";
import Login from "./pages/Login";
import UserContext from "./shared/UserContext";
import Cookies from "js-cookie";

const ProtectedRoutes = (props: RouteProps) => {
    const user = JSON.parse(Cookies.get("user") || "{}");
    console.log(user);
    return Object.entries(user).length !== 0 ? (
        <Outlet />
    ) : (
        <Navigate to="/account/login" />
    );
};

const ProtectedLogin = (props: RouteProps) => {
    const user = JSON.parse(Cookies.get("user") || "{}");

    return Object.entries(user).length !== 0 ? <Navigate to="/" /> : <Outlet />;
};

const App: React.FC = () => {
    const [user, setUser] = useState<any | null>();

    useEffect(() => {
        const cookie = Cookies.get("user");
        console.log("Tried to set user to ", cookie);
        console.log(cookie);
        if (cookie) {
            setUser(JSON.parse(cookie));
        }
    }, []);

    const handleLogout = () => {
        console.log("Attempted log-out");
        Cookies.remove("user");
        setUser(null);
    };

    return (
        <div className="app">
            <BrowserRouter>
                {/* Temporary nav */}
                <nav className="">
                    <div className="px-8 py-4 bg-purple-400">
                        <div className="flex text-white space-x-6">
                            <Link to="/">Home</Link>
                            <Link to="/account/login">Login</Link>
                        </div>
                        <button onClick={handleLogout}>Log-out</button>
                    </div>
                </nav>
                {user ? <h1>Welcome, {user.username}</h1> : null}
                <div className="max-h-100">
                    <UserContext.Provider value={{ user, setUser }}>
                        <Routes>
                            <Route element={<ProtectedRoutes />}>
                                <Route path="/" element={<Home />} />
                            </Route>
                            <Route element={<ProtectedLogin />}>
                                <Route
                                    path="/account/login"
                                    element={<Login />}
                                />
                            </Route>
                        </Routes>
                    </UserContext.Provider>
                </div>
            </BrowserRouter>
        </div>
    );
};

export default App;
