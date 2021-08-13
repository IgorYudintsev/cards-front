import React, {useEffect} from 'react';
import style from './Profile.module.css'
import {ButtonAC} from "../reducers/ButtonReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../redux/store";
import {Redirect} from "react-router-dom";
import {AddNewCardsPackThunk, getCardsPackThunk} from "../reducers/CardsPackReducer";
import {userType} from "../API/CardsApi";
import {Table} from "@material-ui/core";
import {ButtonComponentForCards} from "../components/ButtonComponentForCards";


export const Profile = React.memo(() => {
        let dispatch = useDispatch()
        let cardsPack = useSelector<AppStoreType, Array<userType>>(state => state.cardsPack)
        useEffect(() => {
            dispatch(getCardsPackThunk())
        }, [])

        dispatch(ButtonAC('Profile'))//for yellow buuton
        let loginTrue: any = useSelector<AppStoreType>(state => state.login);
        if (loginTrue.length === 0) {
            console.log('0');
            dispatch(ButtonAC('Login'))//for yellow buuton
            return <Redirect to={'/login'}/>
        }

        const AddNewCardsPack = () => {
            dispatch(AddNewCardsPackThunk())
        }


        return (
            <div className={style.generalDiv}>
                <div className={style.general}>
                    <Table className={style.table}>
                        <tr><h1>Users cards / PROFILE</h1></tr>
                        <ButtonComponentForCards title={'create CARDS pack'} callBack={AddNewCardsPack}/>
                        <tr className={style.tr}>
                            <td className={style.th}>id</td>
                            <td className={style.th}>user id</td>
                            <td className={style.th}>created</td>
                            <td className={style.th}>name</td>
                            <td className={style.th}>cardsCount</td>
                            <td className={style.th}>UPDATE</td>
                            <td className={style.th}>DELETE</td>
                        </tr>
                        {cardsPack.map((m) => {
                            return (
                                <tr>
                                    <td>{m._id}</td>
                                    <td>{m.user_id}</td>
                                    <td>{m.created}</td>
                                    <td>{m.name}</td>
                                    <td>{m.cardsCount}</td>
                                    <td>UPDATE</td>
                                    <td>DELETE</td>
                                </tr>
                            )
                        })}
                    </Table>
                </div>
            </div>
        )
    }
)