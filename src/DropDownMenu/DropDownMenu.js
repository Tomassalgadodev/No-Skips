import React from "react";
import { NavLink } from "react-router-dom";
import './DropDownMenu.css';

const DropDownMenu = ({ hideDropDown, logout }) => {
    return (
        <div className="drop-down-container">
            <NavLink onClick={hideDropDown} to="/" className="drop-down-button">Account</NavLink>
            <div onClick={logout} className="drop-down-button">Log out</div>
        </div>
    )
}

export default DropDownMenu;