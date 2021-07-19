import React from 'react';
import {NavLink} from "react-router-dom";
import styles from './Button.module.css'

type ButtonType={
    title:string
    to:string
    colorButton:string
    changeButtonColor:(title:string)=>void
}

export const Button=(props:ButtonType)=>{
    return(
        <button  onClick={()=>props.changeButtonColor(props.title)} className={props.colorButton===props.title ? styles.yellow : styles.button}>
            <NavLink className={styles.navi} to={`${props.to}`}>
                {props.title}
            </NavLink>
        </button>
    )
}

