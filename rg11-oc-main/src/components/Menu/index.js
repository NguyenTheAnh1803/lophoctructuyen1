import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/components/Auth';
import styles from './Menu.module.scss';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket, faUser, faWrench } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Menu({ children, hideOnClick = false }) {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    };

    const renderResult = (attrs) => (
        <div className={cx('menu-list')} tabIndex="-1" {...attrs}>
            <div className={cx('infor')}>
                <img
                    src="https://files.fullstack.edu.vn/f8-prod/user_avatars/113796/6377a38f5d950.jpg"
                    alt="fullname"
                    className={cx('avatar')}
                />
                <div>
                    <span className={cx('fullname')}>Lai Quang Thang</span>
                    <p className={cx('username')}>@thang038</p>
                </div>
            </div>
            <div className={cx('container')}>
                <Link to="/profile" className={cx('btn')}>
                    <FontAwesomeIcon icon={faUser} />
                    <span className={cx('content')}>Trang cá nhân</span>
                </Link>
                <Link to="/settings" className={cx('btn')}>
                    <FontAwesomeIcon icon={faWrench} />

                    <span className={cx('content')}>Cài đặt</span>
                </Link>
                <Link to="/login" onClick={handleLogout} className={cx('btn')}>
                    <FontAwesomeIcon icon={faRightFromBracket} />

                    <span className={cx('content')}>Đăng xuất</span>
                </Link>
            </div>
        </div>
    );

    return (
        <Tippy
            interactive
            offset={[12, 8]}
            placement="bottom-end"
            hideOnClick={hideOnClick}
            delay={[0, 800]}
            render={renderResult}
        >
            {children}
        </Tippy>
    );
}

export default Menu;
