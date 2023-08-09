import classNames from 'classnames/bind';

import styles from './Sidebar.module.scss';
import { Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullhorn, faCalendar, faHome, faPlus, faRestroom } from '@fortawesome/free-solid-svg-icons';
import Modal from '~/components/Modal';

const cx = classNames.bind(styles);

function Sidebar() {
    const data = JSON.parse(localStorage.getItem('data'));

    const admin = data[0].power;
    return (
        <div className={cx('wrapper')}>
            <div className={cx('side-bar')}>
                {admin && (
                    <>
                        <button
                            className={cx('create-room', { class: true })}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                        >
                            <FontAwesomeIcon icon={faPlus} />
                        </button>
                        <Modal />
                    </>
                )}

                <NavLink className={(nav) => cx('action', { active: nav.isActive })} to="/">
                    <FontAwesomeIcon icon={faHome} />
                    <span className={cx('title')}>Home</span>
                </NavLink>
                <NavLink className={(nav) => cx('action', { active: nav.isActive })} to="/source">
                    <FontAwesomeIcon icon={faRestroom} />
                    <span className={cx('title')}>Lớp học</span>
                </NavLink>
                <NavLink className={(nav) => cx('action', { active: nav.isActive })} to="/calendar">
                    <FontAwesomeIcon icon={faCalendar} />
                    <span className={cx('title')}>Lịch</span>
                </NavLink>
            </div>
            <Link className={cx('bullhorn')} to="/newfeed">
                <FontAwesomeIcon icon={faBullhorn} />
            </Link>
        </div>
    );
}

export default Sidebar;
