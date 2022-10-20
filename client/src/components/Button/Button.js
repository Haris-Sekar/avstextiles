import React from 'react';
import "./Button.css";
import { Link } from "react-router-dom";

const Button = (props) => {
    if(props.onclick)
    return (
        <Link to={props.onclick}>
            <button type={props.type ? props.type : "button"} className={props.className}>{props.title}</button>
        </Link>
    ) 
    else {
        return (<button type={props.type ? props.type : "button"} className={props.className}>{props.title}</button>)
    }
}

export default Button