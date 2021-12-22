import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from "antd";
import List from "./List";
import Search from "../../commons/Search/Search";
import axios from 'axios';
import { URL } from '../../consts/index';

const cx = cn.bind(styles);


const Grammar = () => {
	const [listGrammar, setListGrammar] = useState();
	const [listTestGrammar, setListTestGrammar] = useState();
	const token = window.localStorage.getItem("token-lingo-admin");
	const headers = { Authorization: `Bearer ${token}` };

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const request1 = axios.get(`${URL}/api/Lesson/GetLessonListByType/0`, { headers });
			const request2 = axios.get(`${URL}/api/Lesson/GetLessonListByType/1`, { headers });

			await axios.all([request1, request2]).then(axios.spread((res1, res2) => {
				setListGrammar(res1.data);
				setListTestGrammar(res2.data);
			}))
		} catch (err) {
			console.log(err.response);
		}
	}

	return (
		<Layout>
			<div className={cx("grammar")}>
				<div className={cx("grammar-top")}>
					<div className={cx("title")}>
						Grammar
					</div>
					<Search />
				</div>
				<div className={cx("list")}>
					<div className={cx("oneSite")}>
						<List
							title="Lessons"
							data={listGrammar}
							type={0}
						/>
					</div>
					<div className={cx("oneSite")}>
						<List
							title="Tests"
							data={listTestGrammar}
							type={1}
						/>
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Grammar;