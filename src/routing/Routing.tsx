import React from 'react';
import {Registration} from "../common/Registration";
import {Redirect, Route, Switch} from 'react-router-dom'
import {Login} from "../common/Login";
import {Create} from "../common/Create";
import {Profile} from "../common/Profile";
import {NotFound} from "../common/NotFound";
import {RecoveryPassword} from "../common/RecoveryPassword";
import {SetNewPassword} from "../common/SetNewPassword";

export const Routing = () => {
    return (
        <div>
            <Switch>
                <Route path={'/registration'} render={() => <Registration/>}/>
                <Route exact path={'/'} render={() => <Registration/>}/>
                <Route path={'/login'} render={() => <Login/>}/>
                <Route path={'/create'} render={() => <Create/>}/>
                <Route path={'/profile'} render={() => <Profile/>}/>
                <Route path={'/404'} render={() => <NotFound/>}/>
                <Route path={'/recovery'} render={() => <RecoveryPassword/>}/>
                <Route path={'/newPas'} render={() => <SetNewPassword/>}/>
                <Redirect from={'*'} to={'/404'}/>
            </Switch>
        </div>
    )
}