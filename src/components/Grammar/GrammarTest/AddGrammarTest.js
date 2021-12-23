import React, { useEffect, useState } from 'react';
import styles from '../../Vocab/AddVocab/AddVocab.module.scss';
import cn from 'classnames/bind';
import Layout from '../../../commons/Layout';
import { Spin } from 'antd';
import { headers, URL } from '../../../consts';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const cx = cn.bind(styles);

const AddGrammarTest = () => {
	const history = useHistory();
	const { id } = useParams();
	const [formData, setFormData] = useState({
		"id": "",
		"lessonCode": "",
		"lessonId": "",
		"sentence": "",
		"answerRight": "",
		"answerA": "",
		"answerB": "",
		"answerC": "",
		"answerD": "",
		"comment": ""
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
			const res = await axios.post(`${URL}/api/Admin/add-grammar-excercise`, formData, { headers });
			if (res.status === 200) {
				console.log(res);
				history.push(`/manage-grammar/test/${id}`);
				window.location.reload();
			}
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<Layout>
			<div className={cx("addVocab")}>
				<div className={cx("container")}>
					<div className={cx("pageTitle")}>Add sentence</div>
					<div className={cx("body")}>
						<div className={cx("left")}>
							<div className={cx("oneField")}>
								<div className={cx("title")}>Question</div>
								<input
									placeholder='e.g. Choose the sentence with the right word order'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, sentence: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Answer A</div>
								<input
									placeholder='e.g. Wolfgang Amadeus Mozart was in 1756 in Salzburg born.'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, answerA: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Answer B</div>
								<input
									placeholder='e.g. Wolfgang Amadeus Mozart was born in Salzburg in 1756.'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, answerB: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Answer C</div>
								<input
									placeholder='e.g. Wolfgang Amadeus Mozart was born in 1756 in Salzburg.'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, answerC: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Answer D</div>
								<input
									placeholder='e.g. Wolfgang Amadeus Mozart in 1756 in Salzburg was born.'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, answerD: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Right Answer</div>
								<input
									placeholder='e.g. 3'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, answerRight: e.target.value })}
								/>
							</div>

							<div className={cx("oneField")}>
								<div className={cx("title")}>Comment</div>
								<div className={cx("description")}>Explain the answer</div>
								<textarea
									placeholder='e.g. There is a certain word order in statements: Subject - Auxiliary - Predicate - Object. When we need to mention information about time and place'
									className={cx("input")}
									onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
									rows={6}
								/>
							</div>
						</div>
					</div>

					<div
						className={cx("button")}
						onClick={handleAddLesson}
					>
						ADD SENTENCE
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default AddGrammarTest;