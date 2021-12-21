import React from "react";
import Header from "../Header";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import Navbar from "../Navbar/Navbar";
import Login from "../../components/Login/Login";
import { useHistory } from "react-router-dom";

const cx = cn.bind(styles);

const Layout = ({ children }) => {
	const token = window.localStorage.getItem("token-lingo-admin");
	const history = useHistory();
	return (
		<>
			{token ? (
				<div>
					<Header />
					<Navbar />
					<div style={{ maxWidth: '1180px', margin: '0px auto' }}>
						{children}
					</div>
				</div>
			) : history.push("/login")}
		</>
	)
}

export default Layout;