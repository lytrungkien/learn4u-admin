import React from 'react';
import styles from './Content.module.scss';
import cn from 'classnames/bind';
import { Col, Row } from 'antd';

const cx = cn.bind(styles);

const Content = ({ item }) => {
	return (
		<div className={cx("container")}>
			<Row>
				<Col span={16}>
					<div className={cx("oneRow")}>
						<h3>Lesson code</h3>
						<div>{item.lessonCode}</div>
					</div>
					<div className={cx("oneRow")}>
						<h3>Name</h3>
						<div>{item.name}</div>
					</div>
					<div className={cx("oneRow")}>
						<h3>Description</h3>
						<div>{item.description}</div>
					</div>
					<div className={cx("oneRow")}>
						<h3>Summary</h3>
						<div dangerouslySetInnerHTML={{ __html: item.summary }}></div>
					</div>
					<div className={cx("oneRow")}>
						<h1>Transcript</h1>
						<div dangerouslySetInnerHTML={{ __html: item.transcript }}></div>
					</div>
				</Col>
				<Col offset={2} span={6}>
					<audio controls src={item.audioUrl}>
					</audio>

					<br /> <br /><br />
					<img src={item.imageUrl} alt="lesson" width="100%" />
				</Col>
			</Row>
		</div>
	)
}

export default Content;