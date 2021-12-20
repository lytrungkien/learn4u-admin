import React, { useState } from "react";
import styles from './Navbar.module.scss';
import cn from 'classnames/bind';
import {
	useLocation,
	useHistory,
} from 'react-router-dom'

import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';

const cx = cn.bind(styles);

const Navbar = () => {
	const location = useLocation();
	const history = useHistory();
	console.log(location);

	const navbar = [
		{
			id: 1,
			name: 'Quản lý người dùng',
			path: '/',
		},
		{
			id: 2,
			name: 'Quản lý từ vựng',
			path: '/manage-vocab',
		},
		{
			id: 3,
			name: 'Quản lý ngữ pháp',
			path: '/manage-grammar',
		},
		{
			id: 4,
			name: 'Quản lý hội thoại',
			path: '/manage-conversation',
		},
		{
			id: 5,
			name: 'Tài khoản quản trị viên',
			path: '/admin-account',
		}
	]

	const menu = (
		<Menu>
			<Menu.Item>
				<span>Bài học</span>
			</Menu.Item>
			<Menu.Item>
				<span>Bài kiểm tra</span>
			</Menu.Item>
		</Menu>
	);

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
						{/* {item.id !== 2 && item.id !== 3 ? item.name : (
							<Dropdown overlay={menu}>
								<span>
									{item.name} <DownOutlined />
								</span>
							</Dropdown>
						)} */}
						{item.name}
					</div>
				))
			}
		</div>
	)
}

export default Navbar;