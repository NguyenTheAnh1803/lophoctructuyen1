import { useForm } from 'react-hook-form';
import classNames from 'classnames/bind';

import styles from './Register.module.scss';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const cx = classNames.bind(styles);

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    async function postJSON(data) {
        try {
            const response = await fetch(`http://localhost:5000/users`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
        } catch (error) {
            alert(error);
        }
    }

    const onSubmit = (data) => {
        fetch(`http://localhost:5000/users?username=${data.username}`)
            .then((res) => res.json())
            .then((result) => {
                if (result[0]?.username === data.username) {
                    alert('Tài khoản đã tồn tại!');
                    window.location.reload();
                } else {
                    handleRegister(data);
                }
            });
    };

    const handleRegister = (data) => {
        try {
            if (data.password != data.token) {
                alert('Mật khẩu nhập lại không đúng!');
                return window.location.reload();
            }
            const dataDetail = {
                username: data.username,
                password: data.password,
                full_name: data.full_name,
                token: data.token,
                power: false,
                class: [],
            };
            postJSON(dataDetail);

            alert('Đăng ký thành công', window.location.reload());
        } catch (error) {
            alert(error);
        }
    };

    return (
        <div className={cx('wrapper')} style={{ background: `url(${images.background})` }}>
            <div className={cx('register')}>
                <img src={images.logo} alt="logo" className={cx('logo')} />
                <h2 className={cx('title')}>Central Register Service</h2>

                <form onSubmit={handleSubmit(onSubmit)} className={cx('body-register')}>
                    <label className={cx('label')}>Họ và tên:</label>
                    <input className={cx('input')} type="text" {...register('full_name', { require: true })} />
                    <label className={cx('label')}>Tên đăng nhập:</label>
                    <input className={cx('input')} type="text" {...register('username', { require: true })} />

                    <label className={cx('label')}>Mật khẩu:</label>
                    <input className={cx('input')} type="password" {...register('password')} />
                    <label className={cx('label')}>Nhập lại mật khẩu:</label>
                    <input className={cx('input')} type="password" {...register('token')} />

                    <input type="submit" value="Đăng ký" className={cx('btn')} />
                    {errors.exampleRequired && <span>This field is required</span>}

                    <p className={cx('footer')}>
                        Bạn đã có tài khoản?
                        <Link to="/login" className={cx('login')}>
                            Đăng nhập
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Register;
