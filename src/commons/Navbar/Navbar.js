import React, { useState } from "react";
import styles from './Navbar.module.scss';
import cn from 'classnames/bind';
import {
	useLocation,
	useHistory,
} from 'react-router-dom'

const cx = cn.bind(styles);

const Navbar = () => {
	const location = useLocation();
	const history = useHistory();
	console.log(location);

	const navbar = [
		{
			name: 'Quản lý người dùng',
			path: '/',
		},
		{
			name: 'Quản lý từ vựng',
			path: '/manage-vocab',
		},
		{
			name: 'Quản lý ngữ pháp',
			path: '/manage-grammar',
		},
		{
			name: 'Quản lý hội thoại',
			path: '/manage-conversation',
		},
		{
			name: 'Tài khoản quản trị viên',
			path: '/admin-account',
		}
	]
	return (
		<div className={cx("navbar")}>
			{
				navbar.map((item, id) => (
					<div
						key={id}
						className={cx("item", location.pathname === item.path ? "active" : "")}
						onClick={() => {
							history.push(`${item.path}`)
						}}
					>
						{item.name}
					</div>
				))
			}
		</div>
	)
}

export default Navbar;