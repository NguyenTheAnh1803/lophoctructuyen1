import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function Modal() {
    const [detail, setDetail] = useState(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const user = JSON.parse(localStorage.getItem('data'));

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await fetch(`http://localhost:5000/users/${user[0].id}`)
                .then((response) => response.json())
                .then((data) => {
                    return data;
                });
            setDetail(result);
        };

        fetchAPI();
    }, []);

    async function putJSON(data) {
        try {
            const response = await fetch(`http://localhost:5000/users/${user[0].id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
        } catch (error) {
            alert(123);
        }
    }

    async function postJSON(data) {
        try {
            const response = await fetch(`http://localhost:5000/courses`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result);
        } catch (error) {
            console.log(error);
        }
    }

    const onSubmit = (data) => {
        try {
            const obj = {
                room_id: Math.random(),
                room_img: 'https://files.fullstack.edu.vn/f8-staging/blog_posts/4049/63da2769b2798.png',
                file: [{ name: '' }],
                video: [{ name: '' }],
            };
            const dataDetail = {
                username: detail.username,
                password: detail.password,
                full_name: detail.full_name,
                token: detail.token,
                power: detail.power,
                class: [...detail.class, { ...data, ...obj }],
            };
            putJSON(dataDetail);
            postJSON({ ...data, ...obj });

            alert('Tạo lớp học thành công', window.location.reload());
        } catch (error) {
            alert(error);
        }
    };
    return (
        <div className="modal fade" id="myModal">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Tạo lớp học</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên lớp học"
                                    aria-label="Username"
                                    {...register('course_name', { require: true })}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    {...register('discription', { require: true })}
                                    className="form-control"
                                    placeholder="Mô tả"
                                    aria-label="Username"
                                />
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">
                                Close
                            </button>
                            <input type="submit" value="Đăng ký" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;
