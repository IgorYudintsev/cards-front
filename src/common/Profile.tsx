import React, {useEffect, useState} from 'react';
import style from './Profile.module.css'
import {ButtonAC} from "../reducers/ButtonReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../redux/store";
import {Redirect} from "react-router-dom";
import {
    AddNewCardsPackThunk,
    getCardsPackForPaginationThunk,
    getCardsPackThunk,
    InitialCardsPackReducerType
} from "../reducers/CardsPackReducer";
import {Table} from "@material-ui/core";
import {ButtonComponentForCards} from "../components/ButtonComponentForCards";
import {Pagination} from "../components/Pagination";
import Search from "../components/Search";
import {setSearchValueAC} from "../reducers/SearchReducer";
import {DoubleRange} from "../components/DoubleRange";


export const Profile = React.memo(() => {
        let [userID, setUserID] = useState('')
        let dispatch = useDispatch()
        let cardsPack = useSelector<AppStoreType, InitialCardsPackReducerType>(state => state.cardsPack)
        let maxPageFromServer = Math.ceil(cardsPack.cardPacksTotalCount / cardsPack.pageCount)//maxNumber of pages
        let searchSelector = useSelector<AppStoreType, string>(state => state.search.search)//for search
        let UserIdFromLocalStorage = localStorage.getItem('userId')//for disabled-enabled button

        let [minPagePagination, setMinPagePagination] = useState(1)//for pagination
        let [maxPagePagination, setMaxPagePagination] = useState(10)


        const leftArrowForPaginationHandler = () => {
            console.log(cardsPack)
            console.log(`minPagePagination:${minPagePagination}`)
            console.log(`maxPagePagination:${maxPagePagination}`)
            console.log(`maxPageFromServer:${maxPageFromServer}`)
            setMinPagePagination(minPagePagination - 10)
            setMaxPagePagination(maxPagePagination - 10)
            if (maxPagePagination + 10 >= maxPageFromServer) {
                setMinPagePagination(minPagePagination - 10)
                setMaxPagePagination(minPagePagination - 1)
                dispatch(getCardsPackForPaginationThunk(minPagePagination - 1))
            }
            if (maxPagePagination + 10 <= maxPageFromServer) {  //для перерисовки карточек, когда нажимаем стрелку
                dispatch(getCardsPackForPaginationThunk(maxPagePagination - 10))
            }
        }
        const rightArrowForPaginationHandler = () => {
            if (minPagePagination + 10 >= 11) {  //для перерисовки карточек, когда нажимаем стрелку
                dispatch(getCardsPackForPaginationThunk(minPagePagination + 10))
            }
            setMinPagePagination(minPagePagination + 10)
            setMaxPagePagination(maxPagePagination + 10)
            if (maxPagePagination + 10 >= maxPageFromServer) {
                let maxPage = maxPagePagination - maxPageFromServer
                setMaxPagePagination(maxPagePagination - maxPage)
            }
        }

        useEffect(() => {
            // CardsApi.GETCardsPack()
            //     .then((res) => {
            //             // console.log(res.data)
            //             // dispatch(getCardsPackAC(res.data.cardPacks))
            //             // console.log(res.data)
            //         }
            //     )

            dispatch(getCardsPackThunk({cardsPack, pageCount: 10, packName: searchSelector}))
        }, [searchSelector])

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
                        <div className={style.headerCase}>
                            <ButtonComponentForCards title={'create CARDS pack'} callBack={AddNewCardsPack}/>
                            <Search setSearch={(value) => dispatch(setSearchValueAC(value))}/>
                            <DoubleRange min={0} max={100}/>
                        </div>

                        <div >
                            <tr>
                                <th className={style.td1}>id</th>
                                <th className={style.td1}>user id</th>
                                <th className={style.td1}>created</th>
                                <th className={style.td3}>name</th>
                                <th className={style.td2}>cardsCount</th>
                                <th className={style.td2}>UPDATE</th>
                                <th className={style.td2}>DELETE</th>
                            </tr>

                            {cardsPack.cardPacks.map((m) => {
                                return (
                                    <tr>
                                        <td className={style.td1}>{m._id}</td>
                                        <td className={style.td1}>{m.user_id}</td>
                                        <td className={style.td1}>{m.created}</td>
                                        <td className={style.td3}>{m.name}</td>
                                        <td>{m.cardsCount}</td>
                                        <td>
                                            <button disabled={UserIdFromLocalStorage === m.name ? false : true}>UPDATE
                                            </button>
                                        </td>
                                        <td>
                                            <button disabled={UserIdFromLocalStorage === m.name ? false : true}>DELETE
                                            </button>
                                        </td>

                                    </tr>
                                )
                            })}</div>
                    </Table>


                    <div className={style.generalForPagination}>
                        <button className={style.arrowHover} onClick={leftArrowForPaginationHandler}
                                disabled={minPagePagination == 1 ? true : false}>{`${`<`}`}</button>
                        <Pagination minPagePagination={minPagePagination} maxPagePagination={maxPagePagination}/>
                        <button className={style.arrowHover} onClick={rightArrowForPaginationHandler}
                                disabled={maxPagePagination >= maxPageFromServer ? true : false}> {`${`>`}`}</button>
                    </div>
                </div>


            </div>

        )
    }
)

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

// import React, {useEffect, useState} from 'react';
// import style from './Profile.module.css'
// import {ButtonAC} from "../reducers/ButtonReducer";
// import {useDispatch, useSelector} from "react-redux";
// import {AppStoreType} from "../redux/store";
// import {Redirect} from "react-router-dom";
// import {
//     AddNewCardsPackThunk,
//     getCardsPackForPaginationThunk,
//     getCardsPackThunk,
//     InitialCardsPackReducerType
// } from "../reducers/CardsPackReducer";
// import {Table} from "@material-ui/core";
// import {ButtonComponentForCards} from "../components/ButtonComponentForCards";
// import {Pagination} from "../components/Pagination";
//
//
// export const Profile = React.memo(() => {
//         let [userID, setUserID] = useState('')
//         let dispatch = useDispatch()
//         let cardsPack = useSelector<AppStoreType, InitialCardsPackReducerType>(state => state.cardsPack)
//         let maxPageFromServer = Math.ceil(cardsPack.cardPacksTotalCount / cardsPack.pageCount)//maxNumber of pages
//
//         let UserIdFromLocalStorage = localStorage.getItem('userId')//for disabled-enabled button
//
//
//         let [minPagePagination, setMinPagePagination] = useState(1)//for pagination
//         let [maxPagePagination, setMaxPagePagination] = useState(10)
//
//
//
//         const leftArrowForPaginationHandler = () => {
//             console.log(`minPagePagination:${minPagePagination}`)
//             console.log(`maxPagePagination:${maxPagePagination}`)
//             console.log(`maxPageFromServer:${maxPageFromServer}`)
//             setMinPagePagination(minPagePagination - 10)
//             setMaxPagePagination(maxPagePagination - 10)
//             if (maxPagePagination + 10 >= maxPageFromServer) {
//                 setMinPagePagination(minPagePagination - 10)
//                 setMaxPagePagination(minPagePagination - 1)
//             }
//             if (maxPagePagination + 10 <= maxPageFromServer) {  //для перерисовки карточек, когда нажимаем стрелку
//                 dispatch(getCardsPackForPaginationThunk(maxPagePagination - 10))
//             }
//         }
//
//         const rightArrowForPaginationHandler = () => {
//             if (minPagePagination + 10 >= 11) {  //для перерисовки карточек, когда нажимаем стрелку
//                 dispatch(getCardsPackForPaginationThunk(minPagePagination + 10))
//             }
//             setMinPagePagination(minPagePagination + 10)
//             setMaxPagePagination(maxPagePagination + 10)
//             if (maxPagePagination + 10 >= maxPageFromServer) {
//                 let maxPage = maxPagePagination - maxPageFromServer
//                 setMaxPagePagination(maxPagePagination - maxPage)
//             }
//         }
//
//         useEffect(() => {
//             // CardsApi.GETCardsPack()
//             //     .then((res) => {
//             //             // console.log(res.data)
//             //             // dispatch(getCardsPackAC(res.data.cardPacks))
//             //             // console.log(res.data)
//             //         }
//             //     )
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
//                         {cardsPack.cardPacks.map((m) => {
//                             return (
//                                 <tr>
//                                     <td>{m._id}</td>
//                                     <td>{m.user_id}</td>
//                                     <td>{m.created}</td>
//                                     <td>{m.name}</td>
//                                     <td>{m.cardsCount}</td>
//                                     <td>
//                                         <button disabled={UserIdFromLocalStorage === m.name ? false : true}>UPDATE
//                                         </button>
//                                     </td>
//                                     <td>
//                                         <button disabled={UserIdFromLocalStorage === m.name ? false : true}>DELETE
//                                         </button>
//                                     </td>
//
//                                 </tr>
//                             )
//                         })}
//                     </Table>
//
//
//                     <div>
//                         <button onClick={leftArrowForPaginationHandler}
//                                 disabled={minPagePagination == 1 ? true : false}>{`${`<`}`}</button>
//                         <Pagination minPagePagination={minPagePagination} maxPagePagination={maxPagePagination}/>
//                         <button onClick={rightArrowForPaginationHandler}
//                                 disabled={maxPagePagination >= maxPageFromServer ? true : false}> {`${`>`}`}</button>
//                     </div>
//                 </div>
//
//
//             </div>
//
//         )
//     }
// )

