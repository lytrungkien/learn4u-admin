import React, { useEffect, useState } from "react";
import styles from './DialogueDetail.module.scss';
import cn from 'classnames/bind';
import Layout from "../../commons/Layout";
import { useHistory, useLocation } from "react-router-dom";
import Search from "../../commons/Search/Search";
import axios from "axios";
import { URL, headers } from "../../consts";
import { Col, Row, Form, message, Input, Modal, Button, Spin, Empty } from "antd";
import {
	DeleteOutlined,
	EditOutlined,
	PlusCircleOutlined,
	RightOutlined
} from "@ant-design/icons";
import sound from "../../images/sound.svg";
import { useParams } from "react-router-dom";

const cx = cn.bind(styles);

const DialogueDetail = () => {
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
		setLoading(true);
		try {
			const res = await axios.get(`${URL}/api/Admin/GetLesson/${id}`, { headers });
			if (res.status === 200) {
				setLessonInfo(res.data);
				setLoading(false)
			}
		} catch (err) {
			console.log(err);
		}
	}

	const getLessonDetail = async () => {
		setLoading(true);
		try {
			const res = await axios.get(`${URL}/api/Lesson/GetLessonContent/4/${lessonInfo?.lessonCode}`, { headers });
			if (res.status === 200) {
				console.log(res)
				setLessonDetail(res.data);
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
		}
	}

	const handleDelete = async () => {
		try {
			const res = await axios.delete(`${URL}/api/Admin/delete-vocabulary/${word.id}`, { headers });
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
					<div className={cx("subTitle")}>{lessonInfo?.lessonId}</div>
				</div>
				{!loading ? lessonDetail ? (
					<div className={cx("group-button")}>
						<span className={cx("edit")}><EditOutlined /> Edit</span>
						<span className={cx("delete")}><DeleteOutlined /> Delete</span>
					</div>
				) : (
					<div>
						<div className={cx("create")} onClick={() => history.push(`/manage-vocab/${lessonInfo?.lessonId}/add-vocab`)}>
							<PlusCircleOutlined /> Add lesson content
						</div>
						<div><Empty /></div>
					</div>
				) : (
					<div style={{ textAlign: 'center' }}>
						<Spin />
					</div>
				)}
			</div>

			<Modal
				title="Delete lesson"
				visible={isModalDelete}
				onCancel={() => setIsModalDelete(false)}
				okText="Delete"
				onOk={handleDelete}
				width={320}
			>
				<div>Are you sure you want to delete this word?</div>
			</Modal>
		</Layout>
	)
}

export default DialogueDetail;