import classNames from 'classnames/bind';

import styles from './Source.module.scss';
import Course from './Course';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Source() {
    const [courses, setCourse] = useState([]);
    const [admin, setAdmin] = useState(false);
    const user = JSON?.parse(localStorage?.getItem('username'));

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await fetch(`http://localhost:5000/users?username=${user}`)
                .then((response) => response.json())
                .then((data) => {
                    setAdmin(data[0].power);
                    return data[0].class;
                });

            setCourse(result);
        };

        fetchAPI();
    }, []);

    return (
        <div className={cx('wrapper')}>
            {admin ? (
                <span className={cx('title')}>Lớp dạy của bạn</span>
            ) : (
                <span className={cx('title')}>Khóa học của bạn</span>
            )}
            <div className={cx('content')}>
                {courses.map((value, index) => {
                    return <Course key={index} data={value} />;
                })}
            </div>
        </div>
    );
}

export default Source;
