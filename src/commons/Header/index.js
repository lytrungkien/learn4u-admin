import React from "react";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import logo from '../../images/logo_bgr.png';
import { useHistory, useLocation } from "react-router-dom";

const cx = cn.bind(styles);

const Header = () => {
	const location = useLocation();
	const token = window.localStorage.getItem("token-lingo-admin");
	const history = useHistory();

	return (
		<div className={cx("header")}>
			<div className={cx("top")}>
				<img src={logo} alt="logo" width={100} onClick={() => history.push("/")}/>
				<div>Go to user page</div>
			</div>
			{location.pathname === "/login" || !token ? (<></>) : (
				<div className={cx("container")}>
					<div className={cx("content")}>
						<div className={cx("title")}>Learn4U Admin Page</div>
					</div>
				</div>
			)}
		</div>
	)
}

export default Header;