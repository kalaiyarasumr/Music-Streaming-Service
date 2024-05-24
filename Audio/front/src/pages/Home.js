import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Nav from '../component/topNav';
import Modal from 'react-bootstrap/Modal';
import '../pages/Home.css';

function Team() {
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const handleShow2 = () => setShow2(true);
    const [val, setvalue] = useState({
        file:'',
        title: '',
        description: ''
    });
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        GetData();
        console.log(data);
    }, []);

    const GetData = async () => {
        try {
            const response = await axios.get(`/get`);
            setData(Array.isArray(response.data) ? response.data : []);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const input = (e) => {
        const { name, value } = e.target;
        setvalue({ ...val, [name]: value });
    };

    const Submit = async (e) => {
        e.preventDefault();
        console.log(val);
        try {
            const create = await axios.post('/create', val);
            if (create.data === 'Exist') {
                alert('Already Exist');
            } else if (create.data === 'done') {
                // navigate(`/playerlist/${val.id}`);~
                window.location.reload();

            }
            else if (create.data === 'limit') {
                alert('Reach Limit');
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    const deletename = async (e) => {
        console.log(base64)
        console.log(val);
        try {
            const create = await axios.delete(`/delete/${e}`);
            if (create.data === "deleted") {
               window.location.reload();
            }
        } catch (error) {
            console.error('Error creating game:', error);
        }
    };

    const updated = (d) => {
        const up = axios.put(`/update/${d}`, val);
        console.log(up.data);

        window.location.reload();

    }

    const [base64, setBase64] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setBase64(reader.result);
                const { name} = event.target;
                setvalue({ ...val, [name]: reader.result });
            };
            reader.onerror = () => {
                setError('Failed to read file');
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Nav />
            <div>
                <button
                    onClick={handleShow}
                    className="m-3 bt"
                    style={{ width: '130px', fontSize: '18px', backgroundColor: '#FF7C3B' }}
                >
                    Add Audio
                </button>
                <div className="play_back">
                    <div className="w-75">
                        {data.map((value) => (
                            <div>

                                <div className="inside_play mt-3">
                               
                                    <div className="m-2">
                                        <audio controls src={value.file}/>
                                    </div>
                                    <div className='m-2 mt-0'> Title : {value.title}</div>
                                    <div className='m-2'> Description : {value.description}</div>
                                    <div className='d-flex'>
                                        <div><button className='bt2 ms-2' onClick={handleShow2}>Edit</button></div>
                                        <div><button className='bt2 ms-2' onClick={() => { deletename(value.title) }}>Delete</button></div>
                                    </div>
                                </div>
                                <Modal show={show2} onHide={handleClose2} centered>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Edit</Modal.Title>
                                    </Modal.Header>
                                    <div>
                                        <div className="modal_in m-3">
                                            <label>Audio File</label>
                                            <input
                                                className="mt-1 p-1 inp"
                                                style={{ width: '90%' }}
                                                onChange={handleFileChange}
                                                type='file'
                                                name='file'
                                            />
                                        </div>
                                        <div className="modal_in m-3">
                                            <label>Title</label>
                                            <input
                                                className="mt-1 p-1 inp"
                                                name="title"
                                                min={1}
                                                max={100}
                                                style={{ width: '90%' }}
                                                onChange={input}

                                            />
                                        </div>
                                        <div className="modal_in m-3">
                                            <label>Description</label>
                                            <input
                                                className="mt-1 p-1 inp"
                                                name="description"
                                                min={1}
                                                max={100}
                                                style={{ width: '90%' }}
                                                onChange={input}

                                            />
                                        </div>
                                        <button
                                            className="ms-3 mb-3 bt"
                                            style={{ width: '100px', fontSize: '17px' }}
                                            onClick={() => { updated(value.title) }}
                                        >
                                            Update
                                        </button>
                                    </div>
                                </Modal>
                            </div>

                        ))}
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} centered>
            
                <Modal.Header closeButton>
               
                    <Modal.Title>Add Audio</Modal.Title>
                </Modal.Header>
                <div>
                    <div className="modal_in m-3">
                        <label>Audio File</label>
                        <input
                            className="mt-1 p-1 inp"
                            type='file'
                            style={{ width: '90%' }}
                            onChange={handleFileChange}
                            name='file'
                        />
                    </div>
                    <div className="modal_in m-3">
                        <label>Title</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="title"
                            min={1}
                            max={100}
                            style={{ width: '90%' }}
                            onChange={input}
                        />
                    </div>
                    <div className="modal_in m-3">
                        <label>Description</label>
                        <input
                            className="mt-1 p-1 inp"
                            name="description"
                            min={1}
                            max={100}
                            style={{ width: '90%' }}
                            onChange={input}
                        />
                    </div>
                    <button
                        className="ms-3 mb-3 bt"
                        style={{ width: '100px', fontSize: '17px' }}
                        onClick={Submit}
                    >
                        Add
                    </button>
                </div>
            </Modal>
         
        </>
    );
}

export default Team;
