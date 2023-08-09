import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

function ModalFile({ path }) {
    const [detail, setDetail] = useState({});
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    useEffect(() => {
        const fetchAPI = async () => {
            const result = await fetch(`http://localhost:5000/courses?room_id=${path}`)
                .then((response) => response.json())
                .then((data) => {
                    return data[0];
                });

            setDetail(result);
        };

        fetchAPI();
    }, []);

    async function putJSON(data) {
        try {
            const response = await fetch(`http://localhost:5000/courses/${detail.id}`, {
                method: 'PUT', // or 'PUT'
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
        try {
            const dataDetail = {
                room_id: path,
                room_img: detail.room_img,
                course_name: detail.course_name,
                discription: detail.discription,
                file: [...detail.file, { name: data.course_name }],
                video: detail.video,
            };
            putJSON(dataDetail);

            alert('Tải lên dữ liệu thành công', window.location.reload());
        } catch (error) {
            alert(error);
        }
    };
    return (
        <div className="modal fade" id="myModal2">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h4 className="modal-title">Đăng tài liệu</h4>
                        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="modal-body">
                            <div className="input-group mb-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Tên tài liệu"
                                    aria-label="Username"
                                    {...register('course_name', { require: true })}
                                />
                            </div>

                            <div className="input-group mb-3">
                                <input
                                    type="file"
                                    {...register('file', { require: true })}
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
                            <input type="submit" value="Tải lên" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ModalFile;
