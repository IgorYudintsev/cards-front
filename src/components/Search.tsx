import React, {ChangeEvent, useEffect, useState} from 'react';
import {Input} from "@material-ui/core";
import {useSelector} from "react-redux";
import {AppStoreType} from "../redux/store";
import style from './../common/Profile.module.css'

type PropsType={
    setSearch:(value:string)=>void
}

const Search = (props:PropsType) => {
    let searchSelector=useSelector<AppStoreType,string>(state => state.search.search)
    let[searchValue,setSearchValue]=useState('')
    useEffect(()=>{
        const timeoutId = setTimeout(() => props.setSearch(searchValue), 500)
        return () => clearTimeout(timeoutId)
    },[props.setSearch,searchValue])
    const onInputChange=(event:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        setSearchValue(event.currentTarget.value)
    }
        return (
        // <Input className={style.search} type="text"
        //        value={searchSelector}
        //        placeholder={'Search...'}
        //        onChange={onInputChange}
        // />
            <input className={style.search} value={searchSelector}   placeholder={'Search...'} onChange={onInputChange}/>
    );
};

export default Search;

//----------------------------------------------------------------------------------
//
// import React, {ChangeEvent, useEffect, useState} from 'react';
// import {Input} from "@material-ui/core";
// import {useSelector} from "react-redux";
// import {AppStoreType} from "../redux/store";
// import style from './../common/Profile.module.css'
//
// type PropsType={
//     setSearch:(value:string)=>void
// }
//
// const Search = (props:PropsType) => {
//     let searchSelector=useSelector<AppStoreType>(state => state.search.search)
//     let[searchValue,setSearchValue]=useState('')
//     useEffect(()=>{
//         const timeoutId = setTimeout(() => props.setSearch(searchValue), 500)
//         return () => clearTimeout(timeoutId)
//     },[props.setSearch,searchValue])
//     const onInputChange=(event:ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
//         setSearchValue(event.currentTarget.value)
//     }
//     return (
//         <Input className={style.search} type="text"
//                value={searchSelector}
//                placeholder={'Search...'}
//                onChange={onInputChange}
//         />
//     );
// };
//
// export default Search;