import React from "react";
import Header from "../Header";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import Navbar from "../Navbar/Navbar";

const cx = cn.bind(styles);

const Layout = ({ children }) => {
	return (
		<div>
			<Header />
			<Navbar />
			<div style={{ maxWidth: '1180px', margin: '0px auto' }}>
				{children}
			</div>
		</div>
	)
}

export default Layout;