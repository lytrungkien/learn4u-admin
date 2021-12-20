import React from "react";
import styles from './List.module.scss';
import cn from 'classnames/bind';
import { Row, Col } from "antd";
import { DeleteOutlined, EditOutlined, PlusCircleOutlined } from "@ant-design/icons";

const cx = cn.bind(styles);

const List = ({ data }) => {
	return (
		<div className={cx("list")}>
			<div className={cx("top")}>
				<div className={cx("title")}>Bài học</div>
				<div className={cx("create")}><PlusCircleOutlined /> Create</div>
			</div>
			<div className={cx("table")}>
				<Row className={cx("table-header")}>
					<Col span={3}>
						STT
					</Col>
					<Col span={13}>
						Tên bài
					</Col>
					<Col span={8}>
						Button
					</Col>
				</Row>

				<Row className={cx("table-body")}>
					<Col span={3}>
						STT
					</Col>
					<Col span={13}>
						Tên bài
					</Col>
					<Col span={8}>
						<div className={cx("group-button")}>
							<div className={cx("edit")}><EditOutlined /> Edit</div>
							<div className={cx("delete")}><DeleteOutlined /> Delete</div>
						</div>
					</Col>
				</Row>
				<Row className={cx("table-body")}>
					<Col span={2}>
						STT
					</Col>
					<Col span={12}>
						Tên bài
					</Col>
					<Col span={10}>
						Button
					</Col>
				</Row>
			</div>
		</div>
	)
}

export default List;