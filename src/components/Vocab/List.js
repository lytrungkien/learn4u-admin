import React, { useEffect, useState } from "react";
import styles from './List.module.scss';
import cn from 'classnames/bind';
import { Row, Col, Modal, Select, Form, Input, Button, message } from "antd";
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
	const [isModalCreate, setIsModalCreate] = useState(false);
	const [isModalEdit, setIsModalEdit] = useState(false);
	const [lesson, setLesson] = useState();
	const [form] = Form.useForm();
	const [isModalDelete, setIsModalDelete] = useState(false);
	const history = useHistory();

	useEffect(() => form.resetFields(), [lesson]);

	const handleCancel = () => {
		setIsModalCreate(false);
	};

	const onFinishCreate = async (values) => {
		const bodyParams = {
			type: 2,
			lessonCode: values.lessonCode,
			name: values.name,
		};

		try {
			const res = await axios.post(`${URL}/api/Admin/PostLesson`, bodyParams, { headers });
			if (res.status === 200) {
				message.success("Create a successful new lesson!");
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
			message.error("Error!");
		}

		setIsModalCreate(false);
	};

	const onFinishFailedCreate = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const onFinishEdit = async (values) => {
		const bodyParams = {
			type: 2,
			lessonCode: values.lessonCode,
			name: values.name,
			lessonId: lesson.lessonId,
		};

		try {
			const res = await axios.put(`${URL}/api/Admin/PutLesson`, bodyParams, { headers });
			if (res.status === 200) {
				message.success("Edit successfully!");
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
			message.error("Error!");
		}

		setIsModalEdit(false);
	};

	const onFinishFailedEdit = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	const handleDelete = async () => {
		try {
			const res = await axios.delete(`${URL}/api/Admin/DeleteLesson/${lesson.lessonId}`, { headers });
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

	return (
		<div className={cx("list")}>
			<div className={cx("top")}>
				<div className={cx("title")}></div>
				<div className={cx("create")} onClick={() => setIsModalCreate(true)}>
					<PlusCircleOutlined /> Add new lesson
				</div>
			</div>
			<div className={cx("table")}>
				<Row className={cx("table-header")}>
					<Col span={2} style={{ textAlign: 'center' }}>
						No.
					</Col>
					<Col span={1}></Col>
					<Col span={6}>
						Lesson id
					</Col>
					<Col span={1}></Col>
					<Col span={4}>
						Title
					</Col>
					<Col span={4}>Lesson code</Col>
					<Col span={6}>

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
						<Col span={6}>
							{item.lessonId}
						</Col>
						<Col span={1}></Col>
						<Col span={4}>
							{item.name}
						</Col>
						<Col span={4}>{item.lessonCode}</Col>
						<Col span={6}>
							<div className={cx("group-button")}>
								<div
									className={cx("edit")}
									onClick={() => { 
										setLesson(item)
										setIsModalEdit(true)
									}}>
									<EditOutlined /> Edit
								</div>
								<div
									className={cx("delete")}
									onClick={() => {
										setLesson(item)
										setIsModalDelete(true)
									}}
								><DeleteOutlined /> Delete
								</div>
								<div
									className={cx("detail")}
									onClick={() => history.push({
										pathname: `/manage-vocab/${item.lessonId}`,
										state: { lessonInfo: item },
									})}
								>
									<RightOutlined /> Detail
								</div>
							</div>
						</Col>
					</Row>
				))}
			</div>
			<Modal
				title="Create new lesson"
				visible={isModalCreate}
				onCancel={handleCancel}
				footer={null}
			>
				<Form
					form={form}
					name="create-from"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					onFinish={onFinishCreate}
					onFinishFailed={onFinishFailedCreate}
					autoComplete="off"
				>
					<Form.Item
						label="Lesson code"
						name="lessonCode"
						rules={[{ required: true, message: 'Please input your lesson code!' }]}
					>
						<Input placeholder="e.g. VOCAB_01" />
					</Form.Item>
					<Form.Item
						label="Lesson name"
						name="name"
						rules={[{ required: true, message: 'Please input your lesson name!' }]}
					>
						<Input placeholder="e.g. Bài 1" />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
							Create
						</Button>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title="Edit lesson"
				visible={isModalEdit}
				onCancel={() => setIsModalEdit(false)}
				footer={null}
			>
				<Form
					form={form}
					name="Edit form"
					labelCol={{ span: 6 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ lessonCode: lesson?.lessonCode, name: lesson?.name }}
					onFinish={onFinishEdit}
					onFinishFailed={onFinishFailedEdit}
					name="basic"
				> {console.log("lesson", lesson)}
					<Form.Item
						label="Lesson code"
						name="lessonCode"
						rules={[{ required: true, message: 'Please input your lesson code!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item
						label="Lesson name"
						name="name"
						rules={[{ required: true, message: 'Please input your lesson name!' }]}
					>
						<Input />
					</Form.Item>
					<Form.Item wrapperCol={{ offset: 6, span: 16 }}>
						<Button type="primary" htmlType="submit" style={{ width: '100%' }}>
							Save
						</Button>
					</Form.Item>
				</Form>
			</Modal>

			<Modal
				title="Delete lesson"
				visible={isModalDelete}
				onCancel={() => setIsModalDelete(false)}
				okText="Delete"
				onOk={handleDelete}
				width={320}
			>
				<div>Are you sure you want to delete this lesson?</div>
			</Modal>
		</div>
	)
}

export default List;