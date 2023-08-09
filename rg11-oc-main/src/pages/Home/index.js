import classNames from 'classnames/bind';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '~/components/Auth';
import styles from './Home.module.scss';

const cx = classNames.bind(styles);

function Home() {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/login');
    };
    const data = JSON?.parse(localStorage?.getItem('data'));

    return (
        <div className={cx('wrapper')}>
            welcome to {data[0].username}
            <button onClick={handleLogout}> Logout</button>
        </div>
    );
}

export default Home;
