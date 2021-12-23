import React, { useEffect, useState } from "react";
import styles from '../../Vocab/VocabLessonDetail/VocabLessonDetail.module.scss';
import cn from 'classnames/bind';
import Layout from "../../../commons/Layout";
import { useHistory, useLocation } from "react-router-dom";
import Search from "../../../commons/Search/Search";
import axios from "axios";
import { URL, headers } from "../../../consts";
import { Col, Row, Form, message, Input, Modal, Button, Spin } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
	RightOutlined
} from "@ant-design/icons";
import sound from "../../../images/sound.svg";
import { useParams } from "react-router-dom";

const cx = cn.bind(styles);

const TestDetail = () => {
	const location = useLocation();
	const [lessonDetail, setLessonDetail] = useState();
	const history = useHistory();
	const [word, setWord] = useState();
	const [isModalCreate, setIsModalCreate] = useState(false);
	const [isModalEdit, setIsModalEdit] = useState(false);
	const [form] = Form.useForm();
	const [isModalDelete, setIsModalDelete] = useState(false);
	const [lessonInfo, setLessonInfo] = useState();
	const { id } = useParams();
	const [loading, setLoading] = useState(true);

	useEffect(() => form.resetFields(), [word]);

	useEffect(() => {
		getLessonById();
	}, [id]);

	useEffect(() => {
		getLessonDetail();
	}, [lessonInfo]);

	const getLessonById = async () => {
		try {
			const res = await axios.get(`${URL}/api/Admin/GetLesson/${id}`, { headers });
			if (res.status === 200) {
				setLessonInfo(res.data);
			}
		} catch (err) {
			console.log(err);
		}
	}

	const getLessonDetail = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${URL}/api/Lesson/GetLessonContent/1/${lessonInfo?.lessonCode}`, { headers });
			if (res.status === 200) {
				setLessonDetail(res.data);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
		}
	}

	const handleDelete = async () => {
		try {
			const res = await axios.delete(`${URL}/api/Admin/delete-grammar-excercise/${word.id}`, { headers });
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
		<Layout>
			<div className={cx("detail-page")}>
				<div className={cx("top")}>
					<div className={cx("title")}>{lessonInfo?.name}</div>
					<Search />
				</div>

				<div className={cx("create")} onClick={() => history.push(`/manage-grammar/test/${id}/add-sentence`)}>
					<PlusCircleOutlined /> Add sentence
				</div>

				<div className={cx("table")}>
					<Row className={cx("table-header")}>
						<Col span={2} style={{ textAlign: 'center' }}>No.</Col>
						<Col span={4}>Sentence</Col>
						<Col span={3}>Answer A</Col>
						<Col span={3}>Answer B</Col>
						<Col span={3}>Answer C</Col>
						<Col span={3}>Answer D</Col>
						<Col span={2} style={{ textAlign: 'center' }}>Right Answer</Col>
						<Col span={4}></Col>
					</Row>
					{!loading ? lessonDetail?.map((item, id) => (
						<div key={id}>
							{
								!lessonDetail?.length && (<div style={{ padding: '20px', textAlign: 'center' }}>No data</div>)
							}
							<Row
								className={cx("table-body")}
							>
								<Col span={2} style={{ textAlign: 'center' }}>{id + 1}</Col>
								<Col span={4}>
									{item.sentence.slice(0, 20)}...
								</Col>
								<Col span={3}>
									{item.answerA.slice(0, 12)}...
								</Col>
								<Col span={3}>
									{item.answerB.slice(0, 12)}...
								</Col>
								<Col span={3}>
									{item.answerC.slice(0, 12)}...
								</Col>
								<Col span={3}>
									{item.answerD.slice(0, 12)}...
								</Col>
								<Col span={2} style={{ textAlign: 'center' }}>
									{item.answerRight}
								</Col>
								<Col span={4} style={{ paddingLeft: '20px' }}>
									<div className={cx("group-button")}>
										<div
											className={cx("edit")}
											onClick={() => {
												setWord(item)
												history.push({
													pathname: `/manage-grammar/test/${item.lessonId}/edit-sentence`,
													state: { lesson: item }
												})
											}}>
											<EditOutlined /> Edit
										</div>
										<div
											className={cx("delete")}
											onClick={() => {
												setWord(item)
												setIsModalDelete(true)
											}}
										><DeleteOutlined /> Delete</div>
									</div>
								</Col>
							</Row>
						</div>
					)) : (
						<div style={{ padding: '20px', textAlign: 'center' }}>
							<Spin />
						</div>
					)}
				</div>
			</div>

			<Modal
				title="Delete lesson"
				visible={isModalDelete}
				onCancel={() => setIsModalDelete(false)}
				okText="Delete"
				onOk={handleDelete}
				width={360}
			>
				<div>Are you sure you want to delete this sentence?</div>
			</Modal>
		</Layout>
	)
}

export default TestDetail;