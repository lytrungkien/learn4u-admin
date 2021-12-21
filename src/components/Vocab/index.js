import React, { useEffect, useState } from "react";
import ComingSoon from "../../commons/Comingsoon";
import Layout from "../../commons/Layout";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from "antd";
import List from "./List";
import Search from "../../commons/Search/Search";
import axios from 'axios';
import { URL } from '../../consts/index';

const cx = cn.bind(styles);


const Vocab = () => {
	const [listVocab, setListVocab] = useState();
	const token = window.localStorage.getItem("token-lingo-admin");
	const headers = { Authorization: `Bearer ${token}` };

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const res = await axios.get(`http://20.212.154.207:81/api/Lesson/GetLessonListByType/2`, { headers });
			if (res.status === 200) {
				console.log(res.data);
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
						Từ vựng
					</div>
					<Search />
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

export default Vocab;