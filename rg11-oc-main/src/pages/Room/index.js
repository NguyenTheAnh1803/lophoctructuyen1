import classNames from 'classnames/bind';

import styles from './Room.module.scss';
import { useSocket } from '~/providers/Socket';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import File from './File';
import ModalFile from './ModalFile';
import ModalVideo from './ModalVideo';
import ModalAdd from './ModalAdd';

const cx = classNames.bind(styles);

function Room(props) {
    const [course, setCourse] = useState([]);

    const pathArr = window.location.pathname.split('/');

    const lastPathName = pathArr[pathArr.length - 1];

    const { socket } = useSocket();

    const navigate = useNavigate();

    const data = JSON?.parse(localStorage?.getItem('data'));

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

    const handleRoomJoined = useCallback(
        ({ roomID }) => {
            // console.log('Room Joined', roomID);
            navigate(`/source/room/class/${roomID}`);
        },
        [navigate],
    );

    useEffect(() => {
        socket.on('joined-room', handleRoomJoined);

        return () => {
            socket.off('joined-room', handleRoomJoined);
        };
    }, [handleRoomJoined, socket]);

    const handleJoinRoom = () => {
        socket.emit('join-room', { roomID: course.room_id, emailID: data[0].full_name });
    };

    const admin = data[0].power;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('information')}>
                <div className={cx('preview')}>
                    <h1 className={cx('preview-title')}>{course?.course_name}</h1>
                    <p className={cx('preview-content')}>{course?.discription}</p>
                </div>

                <div className={cx('file')}>
                    <h2 className={cx('file-title')}>Tài liệu học</h2>
                    <ul className={cx('file-list')}>
                        {course.file?.map((value, index) => {
                            return <File data={value} key={index} />;
                        })}
                    </ul>
                </div>
                <div className={cx('video')}>
                    <h2 className={cx('video-title')}>Video bài giảng</h2>
                    <ul className={cx('video-list')}>
                        {course.video?.map((value, index) => {
                            return <File data={value} key={index} />;
                        })}
                    </ul>
                </div>
            </div>
            <div className={cx('function')}>
                <button onClick={handleJoinRoom} className={cx('function-btn')}>
                    VÀO LỚP HỌC
                </button>
                {!admin ? (
                    <button className={cx('function-btn')}>NỘP BÀI</button>
                ) : (
                    <>
                        <button
                            className={cx('function-btn')}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal2"
                        >
                            ĐĂNG TÀI LIỆU
                        </button>
                        <ModalFile path={lastPathName} />
                        <button
                            className={cx('function-btn')}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal3"
                        >
                            ĐĂNG VIDEO BÀI GIẢNG
                        </button>
                        <ModalVideo path={lastPathName} />
                        <button
                            className={cx('function-btn')}
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#modalAdd"
                        >
                            THÊM HỌC VIÊN VÀO LỚP
                        </button>
                        <ModalAdd />
                    </>
                )}
            </div>
        </div>
    );
}

export default Room;
