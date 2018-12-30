import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "../SignOut";
import * as ROUTES from "../constants/routes";
import AuthUserContext from "../Session/context";

const Navigation = ({ authUser }) => (
    <div>
        <AuthUserContext.Consumer>
            {authUser =>
                authUser ? <NavigationAuth /> : <NavigationNonAuth />
            }
        </AuthUserContext.Consumer>
    </div>
);

const NavigationNonAuth = () => (
    <div>
        <div className={"nav-bar"}>
            <div className={"nav-item"}>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </div>
            <div className={"nav-item"}>
                <Link to={ROUTES.SIGN_IN}>Sign In</Link>
            </div>
            <div className={"nav-item"}>
                <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
            </div>
        </div>
    </div>
);

const NavigationAuth = () => (
    <div>
        <div className={"nav-bar"}>
            <div className={"nav-item"}>
                <Link to={ROUTES.LANDING}>Landing</Link>
            </div>
            <div className={"nav-item"}>
                <Link to={ROUTES.HOME}>Home</Link>
            </div>
            <div className={"nav-item"}>
                <Link to={ROUTES.ACCOUNT}>Account</Link>
            </div>
            <div className={"nav-item"}>
                <Link to={ROUTES.ADMIN}>Admin</Link>
            </div>
            <div className={"nav-item"}>
                <SignOutButton />
            </div>
        </div>
    </div>
);

export default Navigation;
