import React from 'react';
import {Registration} from "../common/Registration";
import {Route} from 'react-router-dom'
import {Login} from "../common/Login";
import {Create} from "../common/Create";
import {Profile} from "../common/Profile";
import {NotFound} from "../common/NotFound";
import {RecoveryPassword} from "../common/RecoveryPassword";
import {SetNewPassword} from "../common/SetNewPassword";

export const Routing = () => {
    return (
        <div>
            <Route path={'/registration'} component={() => <Registration/>}/>
            <Route path={'/login'} component={() => <Login/>}/>
            <Route path={'/create'} component={() => <Create/>}/>
            <Route path={'/profile'} component={() => <Profile/>}/>
            <Route path={'/404'} component={() => <NotFound/>}/>
            <Route path={'/recovery'} component={() => <RecoveryPassword/>}/>
            <Route path={'/newPas'} component={() => <SetNewPassword/>}/>
        </div>
    )
}