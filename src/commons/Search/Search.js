import React from "react";
import searchIcon from '../../images/searchIcon.svg';
import styles from './Search.module.scss';
import cn from 'classnames/bind';

const cx = cn.bind(styles);

const Search = () => {
	return (
		<div className={cx("search")}>
			<input placeholder="Search..." className={cx("input")} />
			<div className={cx("button")}>
				<img src={searchIcon} alt="search" />
			</div>
		</div>
	)
}

export default Search;