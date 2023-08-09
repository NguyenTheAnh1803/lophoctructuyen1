import classNames from 'classnames/bind';

import styles from './Room.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Course({ data }) {
    return (
        <li className={cx('file-item')}>
            <FontAwesomeIcon icon={faCheck} className={cx('icon')} />
            <a href="/">{data.name}</a>
        </li>
    );
}

export default Course;
