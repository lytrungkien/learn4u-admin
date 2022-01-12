import { EditOutlined, KeyOutlined, UserOutlined } from "@ant-design/icons";
import { Card, Col, message, Row } from "antd";
import React from "react";
import ComingSoon from "../../commons/Comingsoon";
import Layout from "../../commons/Layout";
import styles from "./index.module.scss";
import cn from "classnames/bind";
import { useHistory } from "react-router-dom";
import { useState } from "react/cjs/react.development";
import axios from 'axios';
import { URL } from "../../consts";

const cx = cn.bind(styles);

const AdminAccount = () => {
	const token = window.localStorage.getItem("token-lingo-admin");
	const headers = { Authorization: `Bearer ${token}` };
	const history = useHistory();
	const [oldPass, setOldPass] = useState();
	const [newPass, setNewPass] = useState();
	const username = window.localStorage.getItem("username-admin");

	const handleChangePassword = async () => {
		console.log(oldPass, newPass);

		const bodyParams = {
			username: username,
			email: "",
			oldPassword: oldPass,
			newPassword: newPass,
		}

		try {
			const res = await axios.put(`${URL}/api/Account/change-password`, bodyParams, { headers });
			if (res.status === 200) {
				message.success("Change password successfully!");
			}
		} catch (err) {
			console.log(err.response);
			message.error(err?.response?.data);
		}
	}

	return (
		<Layout>
			<div style={{ fontSize: '28px', fontWeight: '700' }}>
				Admin account
			</div>
			<div className={cx("body")}>
				<Row gutter={[32, 32]}>
					<Col offset={6} span={12}>
						<Card
							className={cx("card")}
							title={
								<>
									<KeyOutlined /> Change password
								</>
							}
						>

							<div className={cx("field")}>
								<div className={cx("content")}>
									<div
										className={cx("title")}
									>Old password</div>
									<input
										type="password"
										className={cx("value")}
										placeholder=""
										onChange={(e) => setOldPass(e.target.value)}
										required
									/>
									<div></div>
								</div>

							</div>

							<div className={cx("field")}>
								<div className={cx("content")}>
									<div
										className={cx("title")}
									>New password</div>
									<input
										type="password"
										className={cx("value")}
										placeholder=""
										onChange={(e) => setNewPass(e.target.value)}
										required
									/>
								</div>
							</div>
							<div style={{ display: 'flex', justifyContent: 'space-between' }}>
								<div
									className={cx("button1")}
									onClick={handleChangePassword}
								>
									<EditOutlined /> Change password
								</div>
								<div
									className={cx("button2")}
									onClick={() => {
										window.localStorage.setItem("token-lingo-admin", "");
										window.localStorage.setItem("username-admin", "");
										history.push("/login")
									}}
								>
									<EditOutlined /> Logout
								</div>
							</div>
						</Card>
					</Col>
				</Row>
			</div>
		</Layout>
	)
}

export default AdminAccount;