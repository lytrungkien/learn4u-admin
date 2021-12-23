import React, { useEffect, useState } from "react";
import Layout from "../../commons/Layout";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from "antd";
import List from "./List";
import Search from "../../commons/Search/Search";
import axios from 'axios';
import { URL, headers } from '../../consts/index';

const cx = cn.bind(styles);


const Vocab = () => {
	const [listVocab, setListVocab] = useState();

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		try {
			const res = await axios.get(`${URL}/api/Lesson/GetLessonListByType/2`, { headers });
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
						Vocabulary
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