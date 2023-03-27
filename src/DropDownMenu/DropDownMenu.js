import React from "react";
import './DropDownMenu.css';

const DropDownMenu = ({ dropDownActive }) => {
    return (
        <div className={`drop-down-container ${dropDownActive ? '' : 'hidden'}`}>

        </div>
    )
}

export default DropDownMenu;