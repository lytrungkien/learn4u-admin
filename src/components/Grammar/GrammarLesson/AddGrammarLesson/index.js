import React, { useEffect, useState } from 'react';
import styles from '../../../Vocab/AddVocab/AddVocab.module.scss';
import cn from 'classnames/bind';
import Layout from '../../../../commons/Layout';
import { Spin } from 'antd';
import { headers, URL } from '../../../../consts';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const cx = cn.bind(styles);

const AddGrammar = () => {
	const history = useHistory();
	const { id } = useParams();
	const [formData, setFormData] = useState({
		"id": "",
		"order": "",
		"name": "",
		"lessonCode": "",
		"lessonId": "",
		"imageUrl": "",
		"audioUrl": ""
	});

	const [loading, setLoading] = useState({ image: false, audio: false });
	const [lessonInfo, setLessonInfo] = useState();

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

	const handleAddLesson = async () => {
		console.log("formData", formData);
		try {
			const res = await axios.post(`${URL}/api/Admin/add-grammar-learning`, formData, { headers });
			if (res.status === 200) {
				console.log(res);
				history.push(`/manage-grammar/lesson/${id}`);
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
			<div className={cx("addVocab")}>
				<div className={cx("container")}>
					<div className={cx("pageTitle")}>Add grammar lesson</div>
					<div className={cx("body")}>
						<div className={cx("left")}>
							<div className={cx("oneField")}>
								<div className={cx("title")}>Name</div>
								<input
									placeholder='e.g. UUEGi 1-0 Overview'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Lesson order</div>
								<input
									placeholder='e.g ueg_ca_01_000'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, order: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Add image</div>
								{loading.image && <Spin />} &nbsp;&nbsp;
								<input type="file" onChange={handleUploadImage} accept="image/*" />
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Add audio</div>
								{loading.audio && <Spin />}  &nbsp;&nbsp;
								<input type="file" onChange={handleUploadAudio} accept="audio/*" />
							</div>

						</div>
					</div>

					<div
						className={cx("button")}
						onClick={handleAddLesson}
					>
						ADD GRAMMAR LESSON
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default AddGrammar;