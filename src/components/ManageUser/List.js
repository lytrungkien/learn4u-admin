import React, { useEffect, useState } from "react";
import styles from './List.module.scss';
import cn from 'classnames/bind';
import { Row, Col, Modal, Select, Form, Input, Button, message, Tag } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
	RightOutlined
} from "@ant-design/icons";
import axios from "axios";
import { URL, headers } from "../../consts";
import { useHistory } from "react-router-dom";

const cx = cn.bind(styles);

const List = ({ data }) => {
	const [isModalEdit, setIsModalEdit] = useState(false);
	const [lesson, setLesson] = useState();
	const [form] = Form.useForm();
	const [isModalDelete, setIsModalDelete] = useState(false);
	const history = useHistory();

	useEffect(() => form.resetFields(), [lesson]);

	const handleDelete = async () => {
		try {
			const res = await axios.delete(`${URL}/api/Admin/delete-user/${lesson.id}`, { headers });
			console.log(lesson);
			if (res.status === 200) {
				message.success("Delete successfully!");
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
			message.error("Error!");
		}

		setIsModalDelete(false);
	};

	const handleBlockUser = async () => {
		try {
			const res = await axios.post(`${URL}/api/Admin/change-user-blocking-state/${lesson.id}`, { "id": lesson.id }, { headers });
			console.log(lesson);
			if (res.status === 200) {
				message.success("Blocked!");
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
			message.error("Error!");
		}

		setIsModalEdit(false);
	}

	return (
		<div className={cx("list")}>
			<div className={cx("top")}>

			</div>
			<div className={cx("table")}>
				<Row className={cx("table-header")}>
					<Col span={2} style={{ textAlign: 'center' }}>
						No.
					</Col>
					<Col span={1}></Col>
					<Col span={2}>
						User Id
					</Col>
					<Col span={1}></Col>
					<Col span={4}>
						Username
					</Col>
					<Col span={5}>Email</Col>
					<Col span={1}></Col>
					<Col span={3}>Status</Col>
					<Col span={5}>

					</Col>
				</Row>
				{data?.map((item, id) => (
					<Row
						className={cx("table-body")}
						key={id}
					>
						<Col span={2} style={{ textAlign: 'center' }}>
							{id + 1}
						</Col>
						<Col span={1}></Col>
						<Col span={2}>
							{item.id}
						</Col>
						<Col span={1}></Col>
						<Col span={4}>
							{item.userName}
						</Col>
						<Col span={5}>{item.email}</Col>
						<Col span={1}></Col>
						<Col span={3}>
							{item.isBlocked ? (<Tag color="red">Blocked</Tag>) : (<Tag color="green">Active</Tag>)}
						</Col>
						<Col span={5}>
							<div className={cx("group-button")}>
								<div
									className={cx("delete")}
									onClick={() => {
										setLesson(item)
										setIsModalDelete(true)
									}}
								><DeleteOutlined /> Delete
								</div>
								<div
									className={cx(item.isBlocked ? "detail" : "edit")}
									onClick={() => {
										setLesson(item);
										setIsModalEdit(true)
									}}
								>
									{item?.isBlocked ? "Activate" : "Block"}
								</div>
							</div>
						</Col>
					</Row>
				))}
			</div>

			<Modal
				title="Block user"
				visible={isModalEdit}
				onCancel={() => setIsModalEdit(false)}
				width={360}
				onOk={handleBlockUser}
			>
				<div>Are you sure you want to <b>{lesson?.isBlocked ? "activate" : "block"}</b> this user?</div>
			</Modal>

			<Modal
				title="Delete user"
				visible={isModalDelete}
				onCancel={() => setIsModalDelete(false)}
				okText="Delete"
				onOk={handleDelete}
				width={320}
			>
				<div>Are you sure you want to <b>delete</b> this user?</div>
			</Modal>
		</div>
	)
}

export default List;