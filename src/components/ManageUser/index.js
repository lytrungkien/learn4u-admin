import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from "antd";
import List from "./List";
import Search from "../../commons/Search/Search";
import axios from 'axios';
import { URL } from '../../consts/index';
import searchIcon from '../../images/searchIcon.svg';

const cx = cn.bind(styles);


const ManageUser = () => {
	const [listVocab, setListVocab] = useState();
	const [searchKey, setSearchKey] = useState();
	const token = window.localStorage.getItem("token-lingo-admin");
	const headers = { Authorization: `Bearer ${token}` };

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const res = await axios.get(`${URL}/api/Admin/get-list-users`, { headers });
			if (res.status === 200) {
				setListVocab(res.data);
			}
		} catch (err) {
			console.log(err.response);
		}
	}

	const handleSearch = async (e) => {
		if (e.keyCode === 13) {
			try {
				const res = await axios.get(`${URL}/api/Admin/search-list-user?searchText=${searchKey}`, { headers });
				if (res.status === 200) {
					setListVocab(res.data);
				}
			} catch (err) {
				console.log(err.response);
			}
		}
	}

	const search = async () => {
		try {
			const res = await axios.get(`${URL}/api/Admin/search-list-user?searchText=${searchKey}`, { headers });
			if (res.status === 200) {
				setListVocab(res.data);
			}
		} catch (err) {
			console.log(err.response);
		}
	}

	return (
		<Layout>
			<div className={cx("vocab")}>
				<div className={cx("vocab-top")}>
					<div className={cx("title")}>
						Manage users
					</div>
					<div className={cx("search")}>
						<input
							placeholder="Search by email"
							className={cx("input")}
							onChange={(e) => setSearchKey(e.target.value)}
							onKeyUp={(e) => handleSearch(e)}
						/>
						<div className={cx("button")} onClick={search}>
							<img src={searchIcon} alt="search" />
						</div>
					</div>
				</div>
				<div className={cx("list")}>
					<Row gutter={[32, 0]}>
						<Col span={24}>
							<List
								data={listVocab}
								type={2}
								setData={getData}
							/>
						</Col>
					</Row>
				</div>
			</div>
		</Layout>
	)
}

export default ManageUser;