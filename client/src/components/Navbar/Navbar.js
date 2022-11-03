import React, { useState, useEffect } from 'react'
import Button from "../Button/Button";
import { Link, useLocation } from "react-router-dom";
import { LOGOUT } from '../../constants/actionTypes';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import "../Button/Button.css"
const Navbar = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [isLogged, setIsLogged] = useState(localStorage.getItem('token') ? true : false);
	useEffect(() => {
		if (!localStorage.getItem("token")) {
			navigate("/auth");
		}
		else {
			setIsLogged(true);
		}
	}, [navigate]);
	const userLogout = () => {
		dispatch({ type: LOGOUT })
		setIsLogged(false)
		navigate("/auth");
	} 
	return (
		<>
			<div className="navbar">
				<div className="navbarContent">
					<div className="logo"><img src={require("../../assets/images/logo.png")} alt="logo" /></div>
					<div className="navbarItems">
						<ul>
							<li><Link className={location.pathname === "/" ? 'navbarItem active' : "navbarItem"} id='dashboard' to="/">Dashboard</Link></li>
							<li><Link className={location.pathname.includes('customers')? 'navbarItem active' : "navbarItem"} id='customers' to="/customers/Dashboard">Customers</Link></li>
							<li><Link className={location.pathname.includes('products') ? 'navbarItem active' : "navbarItem"} id='products' to="/products">Products</Link></li>
							<li><Link className={location.pathname.includes('invoice') ? 'navbarItem active' : "navbarItem"} id='Invoice' to="/invoice">Invoice</Link></li>
							<li><Link className={location.pathname.includes('reports') ? 'navbarItem active' : "navbarItem"} id='reports' to="/reports">Reports</Link></li>
						</ul>
					</div>
					{/* <div className='profile'>
						<div className="user" onClick={dropdownHandler}><img src={require("../../assets/images/user.png")} alt="logo" /></div>
						<ul className='dropdown' style={{display : ((!showDropdown) ? 'none' : '')}}>
							<li>Profile</li>
							<li>Logout</li>
						</ul>
					</div> */}
					{!isLogged ? (<div className="navbarBtnContainer">
						<Button onclick="/auth" title="Login" className="btn-one" />
					</div>) : <div className="navbarBtnContainer"><button type='button' onClick={userLogout} className='btn-one'>Logout</button></div>}
				</div>

			</div>
		</>
	)
}

export default Navbar