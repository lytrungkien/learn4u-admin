import React, { useEffect, useState } from 'react';
import styles from './EditDialogue.module.scss';
import cn from 'classnames/bind';
import Layout from '../../commons/Layout';
import { Row, Input, Card, Spin } from 'antd';
import { headers, URL } from '../../consts';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const cx = cn.bind(styles);

const AddContent = () => {
	const history = useHistory();
	const location = useLocation();
	const { id } = useParams();
	const [loading, setLoading] = useState({ image: false, audio: false });
	const [lessonInfo, setLessonInfo] = useState();
	const [formData, setFormData] = useState({
		"id": "",
		"lessonCode": "",
		"lessonId": "",
		"name": "",
		"description": "",
		"summary": "",
		"transcript": "",
		"imageUrl": "",
		"audioUrl": ""
	});

	useEffect(() => {
		getLessonById();
	}, [id]);


	const getLessonById = async () => {
		try {
			const res = await axios.get(`${URL}/api/Admin/GetLesson/${id}`, { headers });
			if (res.status === 200) {
				setLessonInfo(res.data);
				setFormData({ ...formData, lessonCode: res.data.lessonCode, lessonId: id });
			}
		} catch (err) {
			console.log(err);
		}
	}

	const handleAddContent = async () => {
		console.log("formData", formData);
		try {
			const res = await axios.post(`${URL}/api/Admin/add-speaking-dialogue`, formData, { headers });
			if (res.status === 200) {
				console.log(res);
				history.push(`/manage-dialogue/${id}`);
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
		}
	}

	const handleUploadImage = async (e) => {
		setLoading({ ...loading, image: true });

		let url = `${URL}/api/Admin/upload-image`;
		let file = e.target.files[0];

		let form = new FormData();
		form.append("file", file);

		axios.post(url, form, {
			headers
		}).then((response) => {
			console.log(response);
			setFormData({ ...formData, imageUrl: response.data.url });
			setLoading({ ...loading, image: false });
		}).catch((error) => {
			console.log(error);
		});
	};

	const handleUploadAudio = async (e) => {
		setLoading({ ...loading, audio: true });

		let url = `${URL}/api/Admin/upload-audio`;
		let file = e.target.files[0];

		let form = new FormData();
		form.append("file", file);

		axios.post(url, form, {
			headers
		}).then((response) => {
			console.log(response);
			setFormData({ ...formData, audioUrl: response.data.url });
			setLoading({ ...loading, audio: false });
		}).catch((error) => {
			console.log(error);
		});
	};

	return (
		<Layout>
			<div className={cx("editVocab")}>
				<div className={cx("container")}>
					<div className={cx("pageTitle")}>Add lesson content</div>
					<div className={cx("body")}>
						<div className={cx("left")}>
							<div className={cx("oneField")}>
								<div className={cx("title")}>Name</div>
								<input
									placeholder='Lesson name'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Description</div>
								<input
									
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, description: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Summary</div>
								<input
									
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Transcript</div>
								<div className={cx("description")}>Dialogue content</div>
								<textarea
										className={cx("input")}
										onChange={(e) => setFormData({ ...formData, transcript: e.target.value })}
										rows={15}
									/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Add image</div>
								{loading.image && <Spin />} &nbsp;&nbsp;
								<input
									type="file"
									onChange={handleUploadImage}
									accept="image/*"
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Add audio</div>
								{loading.audio && <Spin />}  &nbsp;&nbsp;
								<input
									type="file"
									onChange={handleUploadAudio}
									accept="audio/*"
								/>
							</div>

						</div>
					</div>

					<br /><br />
					<span
						className={cx("button")}
						onClick={handleAddContent}
					>
						ADD LESSON CONTENT
					</span> &nbsp; &nbsp;
					<span
						className={cx("button")}
						style={{ background: "#000000" }}
						onClick={() => history.push(`/manage-dialogue/${lessonInfo.lessonId}`)}
					>
						CANCEL
					</span>
				</div>
			</div>
			<br /><br />
		</Layout>
	)
}

export default AddContent;