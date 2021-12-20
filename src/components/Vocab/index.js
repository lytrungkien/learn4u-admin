import React from "react";
import ComingSoon from "../../commons/Comingsoon";
import Layout from "../../commons/Layout";
import styles from './index.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from "antd";
import List from "./List";
import Search from "../../commons/Search/Search";

const cx = cn.bind(styles);

const Vocab = () => {
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
						<Col span={12}>
							<List />
						</Col>
						<Col span={12}>
							<List />
						</Col>
					</Row>
				</div>
			</div>
		</Layout>
	)
}

export default Vocab;