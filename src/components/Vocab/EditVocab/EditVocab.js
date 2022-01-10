import React, { useEffect, useState } from 'react';
import styles from './EditVocab.module.scss';
import cn from 'classnames/bind';
import Layout from '../../../commons/Layout';
import { Row, Input, Card, Spin } from 'antd';
import { headers, URL } from '../../../consts';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const cx = cn.bind(styles);

const EditVocab = () => {
	const history = useHistory();
	const location = useLocation();
	const { id } = useParams();
	const [loading, setLoading] = useState({ image: false, audio: false });
	const [lessonInfo, setLessonInfo] = useState();
	const word = location.state.word;
	const [formData, setFormData] = useState({
		"id": word.id,
		"name": word.name,
		"suggestion": word.suggestion,
		"transcription": word.transcription,
		"meaning": word.meaning,
		"fullMeaning": word.fullMeaning,
		"explanation": word.explanation,
		"imageUrl": word.imageUrl,
		"audioUrl": word.audioUrl,
		"lessonCode": word.lessonCode,
		"lessonId": word.lessonId,
	});

	useEffect(() => {
		getLessonById();
		// setFormData({
		// 	"id": word.id,
		// 	"name": word.name,
		// 	"suggestion": word.suggestion,
		// 	"transcription": word.transcription,
		// 	"meaning": word.meaning,
		// 	"fullMeaning": word.fullMeaning,
		// 	"explanation": word.explanation,
		// 	"imageUrl": word.imageUrl,
		// 	"audioUrl": word.audioUrl,
		// 	"lessonCode": word.lessonCode,
		// 	"lessonId": word.lessonId,
		// })
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

	const handleEditVocab = async () => {
		console.log("formData", formData);
		try {
			const res = await axios.put(`${URL}/api/Admin/update-vocabulary`, formData, { headers });
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
			<div className={cx("editVocab")}>
				<div className={cx("container")}>
					<div className={cx("pageTitle")}>Edit vocabulary</div>
					<div className={cx("body")}>
						<div className={cx("left")}>
							<div className={cx("oneField")}>
								<div className={cx("title")}>Name</div>
								<input
									defaultValue={word.name}
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, name: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Transcription</div>
								<input
									defaultValue={word.transcription}
									placeholder='e.g /tekˈnɒlədʒi/'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, transcription: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Meaning</div>
								<input
									defaultValue={word.meaning}
									placeholder='e.g. Công nghệ'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, meaning: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Full meaning</div>
								<div className={cx("description")}>Fully explain the meaning of the word by Vietnamese</div>
								<textarea
									defaultValue={word.fullMeaning}
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
									defaultValue={word.suggestion}
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
									defaultValue={word.explanation}
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
								<input
									type="file"
									onChange={handleUploadImage}
									accept="image/*"
								/>
								<div>
									{loading.image ? <Spin style={{ marginTop: '20px' }} /> : (
										<img src={formData.imageUrl} alt="vocab" width={80} className={cx("box-img")} />
									)}
								</div>
							</div>


							<div className={cx("oneField")}>
								<div className={cx("title")}>Add audio</div>
								<input
									type="file"
									onChange={handleUploadAudio}
									accept="audio/*"
								/>
								<div style={{ marginTop: '20px' }}>
									{loading.audio ? <Spin /> : (
									<audio controls src={formData.audioUrl}>
									</audio>
								)}
								</div>
							</div>

						</div>
					</div>

					<br /><br />
					<span
						className={cx("button")}
						onClick={handleEditVocab}
					>
						EDIT VOCABULARY
					</span> &nbsp; &nbsp;
					<span
						className={cx("button")}
						style={{ background: "#000000" }}
						onClick={() => history.push(`/manage-vocab/${word.lessonId}`)}
					>
						CANCEL
					</span>
				</div>
			</div>
			<br /><br />
		</Layout>
	)
}

export default EditVocab;