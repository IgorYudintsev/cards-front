import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import styles from './../common/Profile.module.css';
import {getCardsPackThunk, InitialCardsPackReducerType} from "../reducers/CardsPackReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../redux/store";

// const useStyles = makeStyles({
//     root: {
//         width: 300,
//     },
// });

function valuetext(value: number) {
    return `${value}°C`;
}

type PropsType = {
    min: number
    max: number
}

export let DoubleRange = React.memo((props: PropsType) => {
    let dispatch = useDispatch()
    let cardsPack = useSelector<AppStoreType, InitialCardsPackReducerType>(state => state.cardsPack)
    const [value, setValue] = React.useState<number[]>([props.min, props.max]);

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            dispatch(getCardsPackThunk({cardsPack, pageCount: 10, min: value[0], max: value[1]}))
        }, 500)
        return () => clearTimeout(timeoutId)
    }, [value])

    const handleChange = (event: any, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };


    return (
        <span className={styles.range}>

                <Typography id="range-slider" gutterBottom>cardsCount</Typography>
                <Slider
                    value={value}
                    min={props.min}
                    max={props.max}
                    onChange={handleChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="range-slider"
                    getAriaValueText={valuetext}
                />

        </span>
    );
})