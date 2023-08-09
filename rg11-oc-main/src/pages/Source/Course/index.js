import classNames from 'classnames/bind';

import styles from './Course.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function Course({ data }, props) {
    return (
        <div className={cx('course')}>
            <div className={cx('course-bgr')} style={{ backgroundImage: `url(${data.room_img})` }}>
                <Link
                    to={{
                        pathname: `/source/room/${data.room_id}`,
                        state: '1323',
                    }}
                    className={cx('course-view')}
                >
                    Xem khóa học
                </Link>
            </div>

            <span className={cx('course-name')}>{data.course_name}</span>
        </div>
    );
}

export default Course;
