import React from "react";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import logo from '../../images/logo_bgr.png';
import searchIcon from '../../images/searchIcon.svg';

const cx = cn.bind(styles);

const Header = () => {
	return (
		<div className={cx("header")}>
			<div className={cx("top")}>
				<img src={logo} alt="logo" width={100} />
				<div>Đi đến trang người dùng</div>
			</div>
			<div className={cx("container")}>
				<div className={cx("content")}>
					<div className={cx("title")}>Learn4U Admin Page</div>
					<div className={cx("search")}>
						<input placeholder="Search..." className={cx("input")}/>
						<div className={cx("button")}>
							<img src={searchIcon} alt="search" />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Header;