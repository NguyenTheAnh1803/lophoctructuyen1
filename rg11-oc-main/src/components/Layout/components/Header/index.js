import classNames from 'classnames/bind';
import { faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import styles from './Header.module.scss';
import Menu from '~/components/Menu';

const cx = classNames.bind(styles);

function Header() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <div className={cx('logo')}>
                    <Link to="/">RG11-OC </Link>
                    <span>Lớp học trực tuyến</span>
                </div>

                <div className={cx('search')}>
                    <FontAwesomeIcon icon={faSearch} className={cx('icon-search')} />
                    <input className={cx('input-search')} type="text" placeholder="Tìm kiểm khóa học..." />
                </div>

                <div className={cx('actions')}>
                    <FontAwesomeIcon icon={faBell} className={cx('icon')} />
                    <p className={cx('full-name')}>Lai Quang Thang</p>
                    <Menu>
                        <img
                            src="https://files.fullstack.edu.vn/f8-prod/user_avatars/113796/6377a38f5d950.jpg"
                            alt="fullname"
                            className={cx('avatar')}
                        />
                    </Menu>
                </div>
            </div>
        </div>
    );
}

export default Header;
