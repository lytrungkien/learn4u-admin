import React, { useEffect, useState } from 'react';
import styles from './AddVocab.module.scss';
import cn from 'classnames/bind';
import Layout from '../../../commons/Layout';
import { Row, Input, Card, Spin } from 'antd';
import { headers, URL } from '../../../consts';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const cx = cn.bind(styles);

const AddVocab = () => {
	const history = useHistory();
	const { id } = useParams();
	const [formData, setFormData] = useState({
		"id": "",
		"name": "",
		"suggestion": "",
		"transcription": "",
		"meaning": "",
		"fullMeaning": "",
		"explanation": "",
		"imageUrl": "",
		"audioUrl": "",
		"lessonCode": "",
		"lessonId": ""
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

	const handleAddNewWord = async () => {
		console.log("formData", formData);
		try {
			const res = await axios.post(`${URL}/api/Admin/add-vocabulary`, formData, { headers });
			if (res.status === 200) {
				console.log(res);
				history.push(`/manage-vocab/${id}`);
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
					<div className={cx("pageTitle")}>Add new word</div>
					<div className={cx("body")}>
						<div className={cx("left")}>
							<div className={cx("oneField")}>
								<div className={cx("title")}>Name</div>
								<input
									placeholder='e.g. Technology'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Transcription</div>
								<input
									placeholder='e.g /tekˈnɒlədʒi/'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, transcription: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Meaning</div>
								<input
									placeholder='e.g. Công nghệ'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Full meaning</div>
								<div className={cx("description")}>Fully explain the meaning of the word by Vietnamese</div>
								<textarea
									placeholder='e.g.Công nghệ'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, fullMeaning: e.target.value })}
									rows={10}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Suggestion</div>
								<div className={cx("description")}>
									Help learners guess words during flashcard learning
								</div>
								<input
									placeholder='e.g. T_ _h_ ol_ _y'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, suggestion: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Explanation</div>
								<div className={cx("description")}>
									Explain the meaning of words by English and example sentences
								</div>
								<textarea
									placeholder='e.g. Scientific knowledge used in practical ways in industry, for example in designing new machines'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, explanation: e.target.value })}
									rows={4}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Add image</div>
								<div className={cx("description")}>
									Image make it easier for learners to remember vocabulary
								</div>
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
						onClick={handleAddNewWord}
					>
						ADD NEW VOCABULARY
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default AddVocab;