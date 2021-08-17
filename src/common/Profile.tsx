import React, {useEffect, useState} from 'react';
import style from './Profile.module.css'
import {ButtonAC} from "../reducers/ButtonReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../redux/store";
import {Redirect} from "react-router-dom";
import {AddNewCardsPackThunk, getCardsPackThunk, InitialCardsPackReducerType} from "../reducers/CardsPackReducer";
import {CardPacksType, CardsApi, userType} from "../API/CardsApi";
import {Table} from "@material-ui/core";
import {ButtonComponentForCards} from "../components/ButtonComponentForCards";


export const Profile = React.memo(() => {
        let [userID, setUserID] = useState('')
        let dispatch = useDispatch()
        let cardsPack = useSelector<AppStoreType, InitialCardsPackReducerType>(state => state.cardsPack)
        // let cardsPack = useSelector<AppStoreType, CardPacksType>(state => state.cardsPack)
        // let cardsPack2 = useSelector<AppStoreType, CardPacksType>(state => state.cardsPack)
        console.log(cardsPack)
        let UserIdFromLocalStorage = localStorage.getItem('userId')


        useEffect(() => {
            // CardsApi.GETCardsPack()
            //     .then((res) => {
            //             // console.log(res.data)
            //             // dispatch(getCardsPackAC(res.data.cardPacks))
            //             // console.log(res.data)
            //         }
            //     )
            dispatch(getCardsPackThunk())
        }, [])

        dispatch(ButtonAC('Profile'))//for yellow button
        let loginTrue: any = useSelector<AppStoreType>(state => state.login);
        if (loginTrue.length === 0) {
            dispatch(ButtonAC('Login'))//for yellow button
            return <Redirect to={'/login'}/>
        }

        const AddNewCardsPack = () => {
            console.log(userID)
            dispatch(AddNewCardsPackThunk(setUserID))
        }


        return (
            <div className={style.generalDiv}>
                <div className={style.general}>
                    <tr><h1 className={style.header}>Users cards / PROFILE</h1></tr>
                    <Table className={style.table}>
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
                        {cardsPack.cardPacks.map((m) => {
                            return (
                                <tr>
                                    <td>{m._id}</td>
                                    <td>{m.user_id}</td>
                                    <td>{m.created}</td>
                                    <td>{m.name}</td>
                                    <td>{m.cardsCount}</td>
                                    <td>
                                        <button disabled={UserIdFromLocalStorage === m.user_id ? false : true}>UPDATE
                                        </button>
                                    </td>
                                    <td>
                                        <button disabled={UserIdFromLocalStorage === m.user_id ? false : true}>DELETE
                                        </button>
                                    </td>

                                </tr>
                            )
                        })}
                    </Table>
                </div>
            </div>
        )
    }
)

//-------------------------------------------------------------------------------------------------------------------------------------------

// import React, {useEffect, useState} from 'react';
// import style from './Profile.module.css'
// import {ButtonAC} from "../reducers/ButtonReducer";
// import {useDispatch, useSelector} from "react-redux";
// import {AppStoreType} from "../redux/store";
// import {Redirect} from "react-router-dom";
// import {AddNewCardsPackThunk, getCardsPackThunk} from "../reducers/CardsPackReducer";
// import {CardPacksType, userType} from "../API/CardsApi";
// import {Table} from "@material-ui/core";
// import {ButtonComponentForCards} from "../components/ButtonComponentForCards";
//
//
// export const Profile = React.memo(() => {
//         let [userID, setUserID] = useState('')
//         let dispatch = useDispatch()
//         let cardsPack = useSelector<AppStoreType, Array<userType>>(state => state.cardsPack)
//         // let cardsPack2 = useSelector<AppStoreType, CardPacksType>(state => state.cardsPack)
//         console.log(cardsPack)
//         let UserIdFromLocalStorage = localStorage.getItem('userId')
//
//
//         useEffect(() => {
//             dispatch(getCardsPackThunk())
//         }, [])
//
//         dispatch(ButtonAC('Profile'))//for yellow button
//         let loginTrue: any = useSelector<AppStoreType>(state => state.login);
//         if (loginTrue.length === 0) {
//             dispatch(ButtonAC('Login'))//for yellow button
//             return <Redirect to={'/login'}/>
//         }
//
//         const AddNewCardsPack = () => {
//             console.log(userID)
//             dispatch(AddNewCardsPackThunk(setUserID))
//         }
//
//
//         return (
//             <div className={style.generalDiv}>
//                 <div className={style.general}>
//                     <tr><h1 className={style.header}>Users cards / PROFILE</h1></tr>
//                     <Table className={style.table}>
//                         <ButtonComponentForCards title={'create CARDS pack'} callBack={AddNewCardsPack}/>
//                         <tr className={style.tr}>
//                             <td className={style.th}>id</td>
//                             <td className={style.th}>user id</td>
//                             <td className={style.th}>created</td>
//                             <td className={style.th}>name</td>
//                             <td className={style.th}>cardsCount</td>
//                             <td className={style.th}>UPDATE</td>
//                             <td className={style.th}>DELETE</td>
//                         </tr>
//                         {cardsPack.map((m) => {
//                             return (
//                                 <tr>
//                                     <td>{m._id}</td>
//                                     <td>{m.user_id}</td>
//                                     <td>{m.created}</td>
//                                     <td>{m.name}</td>
//                                     <td>{m.cardsCount}</td>
//                                     <td>
//                                         <button disabled={UserIdFromLocalStorage === m.user_id ? false : true}>UPDATE
//                                         </button>
//                                     </td>
//                                     <td>
//                                         <button disabled={UserIdFromLocalStorage === m.user_id ? false : true}>DELETE
//                                         </button>
//                                     </td>
//
//                                 </tr>
//                             )
//                         })}
//                     </Table>
//                 </div>
//             </div>
//         )
//     }
// )