import classNames from 'classnames/bind';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

import { useAuth } from '~/components/Auth';
import styles from './Login.module.scss';
import images from '~/assets/images';

const cx = classNames.bind(styles);

function Login() {
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();
    const auth = useAuth();
    const location = useLocation();

    const redirectPath = location.state?.path || '/';

    localStorage.clear();

    const handleLogin = () => {
        fetch(`http://localhost:5000/users?username=${user}`)
            .then((response) => response.json())
            .then((data) => {
                if (data?.length === 0) {
                    alert('Khong co du lieu!');
                } else {
                    auth.login(user, password, data);
                    auth.setTokens(data[0].token);
                    navigate(redirectPath, { replace: true });
                }
            });
    };
    return (
        <div className={cx('wrapper')} style={{ background: `url(${images.background})` }}>
            <div className={cx('login')}>
                <img src={images.logo} alt="logo" className={cx('logo')} />
                <h2 className={cx('title')}>Dịch vụ xác thực trung tâm</h2>
                <div className={cx('body-login')}>
                    <label className={cx('label')}>Tên đăng nhập:</label>
                    <input className={cx('input')} type="text" onChange={(e) => setUser(e.target.value)} />

                    <label className={cx('label')}>Mật khẩu:</label>
                    <input className={cx('input')} type="password" onChange={(e) => setPassword(e.target.value)} />
                    <button className={cx('btn')} onClick={handleLogin}>
                        Đăng nhập
                    </button>
                </div>

                <p className={cx('footer')}>
                    Bạn chưa có tài khoản?
                    <Link to="/register" className={cx('register')}>
                        Đăng ký
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
