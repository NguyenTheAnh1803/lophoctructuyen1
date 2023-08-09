import classNames from 'classnames/bind';
import { useEffect, useState } from 'react';

import styles from './Room.module.scss';

const cx = classNames.bind(styles);

function ModalAdd() {
    const [user, setUser] = useState([]);
    const [userAdd, setUserAdd] = useState([]);
    const [userKey, setUserKey] = useState([]);
    const [course, setCourse] = useState([]);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await fetch(`http://localhost:5000/users`)
                .then((response) => response.json())
                .then((data) => {
                    return data;
                });

            setUser(result);
        };

        fetchAPI();
    }, []);

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await fetch(`http://localhost:5000/users`)
                .then((response) => response.json())
                .then((data) => {
                    return data;
                });

            setUserKey(result);
        };

        fetchAPI();
    }, []);

    const pathArr = window.location.pathname.split('/');

    const lastPathName = pathArr[pathArr.length - 1];

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await fetch(`http://localhost:5000/courses?room_id=${lastPathName}`)
                .then((response) => response.json())
                .then((data) => {
                    return data[0];
                });

            setCourse(result);
        };

        fetchAPI();
    }, []);

    async function putJSON(data, id) {
        try {
            const response = await fetch(`http://localhost:5000/users/${id}`, {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
        } catch (error) {
            console.log(error);
        }
    }

    const handleAddUser = () => {
        userAdd.forEach((user) => {
            userKey.forEach((val) => {
                var check = false;
                val.class.forEach((cou) => {
                    if (cou.room_id === course.room_id) {
                        return (check = true);
                    }
                });
                console.log(check);

                if (val.id === user.id && check === false) {
                    try {
                        const dataDetail = {
                            username: val.username,
                            password: val.password,
                            full_name: val.full_name,
                            token: val.token,
                            power: val.power,
                            class: [...val.class, course],
                        };
                        putJSON(dataDetail, val.id);
                        alert('Thêm lớp thành công', window.location.reload());
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log('Lỗi ');
                    return;
                }
            });
        });

        // userAdd.map((user) => {
        //     userKey.map((val) => {
        //         if (val.id == user.id) {
        //             try {
        //                 const dataDetail = {
        //                     username: val.username,
        //                     password: val.password,
        //                     full_name: val.full_name,
        //                     token: val.token,
        //                     power: val.power,
        //                     class: [...val.class, course],
        //                 };
        //                 putJSON(dataDetail, val.id);

        //                 alert('Thêm lớp thành công', window.location.reload());
        //             } catch (error) {
        //                 alert(error);
        //             }
        //         } else {
        //             console.log('vao day');
        //         }
        //     });
        // });
    };

    return (
        <div className="modal fade" id="modalAdd" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header ">
                        <h5 className="modal-title h3 align-items-center" id="exampleModalLabel">
                            Thêm học viên vào lớp
                        </h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className={cx('body-top')}>
                            <span>Học viên được thêm</span>
                            {userAdd.map((value, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={cx('full-name')}
                                        onClick={() => {
                                            const remove = userAdd.findIndex((item) => item.id === value.id);
                                            const userRm = userAdd.splice(remove, 1);
                                            const userNew = userAdd;
                                            setUserAdd(() => [...userNew]);
                                            setUser((prv) => [...prv, ...userRm]);
                                        }}
                                    >
                                        {value.full_name}
                                    </button>
                                );
                            })}
                        </div>
                        <div className={cx('body-bottom')}>
                            <span>Tất cả học viên</span>
                            {user.map((result, index) => {
                                return (
                                    <button
                                        key={index}
                                        className={cx('full-name')}
                                        onClick={() => {
                                            const remove = user.findIndex((item) => item.id === result.id);
                                            const userRm = user.splice(remove, 1);
                                            const userNew = user;
                                            setUser(() => [...userNew]);
                                            setUserAdd((prv) => [...prv, ...userRm]);
                                        }}
                                    >
                                        {result.full_name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                            Thoát
                        </button>
                        <button type="button" onClick={handleAddUser} className="btn btn-primary">
                            Thêm
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ModalAdd;
