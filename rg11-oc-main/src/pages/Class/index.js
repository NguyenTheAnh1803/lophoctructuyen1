import classNames from 'classnames/bind';
import React, { useEffect, useCallback, useState } from 'react';
import { usePeer } from '~/providers/Peer';
import { useSocket } from '~/providers/Socket';
import styles from './Class.module.scss';
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneSlash } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const Class = () => {
    const { socket } = useSocket();

    const [myStream, setMyStream] = useState(null);
    const [remoteEmailID, setRemoteEmailID] = useState();

    const data = JSON?.parse(localStorage?.getItem('data'));

    const ref = window.location.href;

    const num = ref.split('/');

    const lastRef = num[num.length - 1];

    const firstUser = data[0].full_name;

    const [user, setUser] = useState([firstUser]);

    const { peer, createOffer, createAnswer, setRemoteAns, sendStream, remoteStream } = usePeer();

    const handleNewUserJoined = useCallback(
        async (data) => {
            const { emailID } = data;
            console.log('New user join room', emailID);

            setUser((prv) => [...prv, emailID]);

            const offer = await createOffer();

            socket.emit('call-user', { emailID, offer });

            setRemoteEmailID(emailID);

            sendStream(myStream);
        },
        [socket],
    );

    const handleInCommingCall = useCallback(
        async (data) => {
            const { from, offer } = data;

            setUser((prv) => [...prv, from]);

            console.log('Incommingcall', from, offer);
            const ans = await createAnswer(offer);
            socket.emit('call-accepted', { emailID: from, ans });

            setRemoteEmailID(from);
        },
        [createAnswer, socket],
    );

    const handleCallAccepted = useCallback(
        async (data) => {
            const { ans } = data;
            console.log('Call got acc', ans);
            sendStream(myStream);

            await setRemoteAns(ans);
        },
        [setRemoteAns],
    );

    const getUserMediaStream = useCallback(async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: false, video: true });

        setMyStream(stream);
    }, []);

    const handleNegotiation = useCallback(async () => {
        console.log('nego pleasea');
        const localOffer = await peer.createOffer();
        socket.emit('call-user', { emailId: remoteEmailID, offer: localOffer });
    }, []);

    // const handleDisconnect = useCallback(async (reason) => {
    //     const { close } = reason;
    //     if (close) {
    //         console.log('Diss room');
    //     }

    //     const offer = await createOffer();

    //     socket.emit('close', {  });
    // }, []);

    useEffect(() => {
        socket.on('user-joined', handleNewUserJoined);
        socket.on('incomming-call', handleInCommingCall);
        socket.on('call-accepted', handleCallAccepted);
        // socket.on('disconnect', handleDisconnect);

        return () => {
            socket.off('user-joined', handleNewUserJoined);
            socket.off('incomming-call', handleInCommingCall);
            socket.off('call-accepted', handleCallAccepted);
            // socket.off('disconnect', handleDisconnect);
        };
    }, [handleCallAccepted, handleInCommingCall, handleNewUserJoined, socket]);

    useEffect(() => {
        peer.addEventListener('negotiationneeded', handleNegotiation);

        return () => {
            peer.removeEventListener('negotiationneeded', handleNegotiation);
        };
    }, []);

    useEffect(() => {
        getUserMediaStream();
    }, [getUserMediaStream]);

    console.log(remoteStream);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('body')}>
                {user?.map((value, index) => {
                    return (
                        <div key={index} className={cx('video')}>
                            <ReactPlayer url={myStream} playing className={cx('render-video')} />
                            <h2 key={index} className={cx('video-name')}>
                                {value}
                            </h2>
                        </div>
                    );
                })}
            </div>
            {/* {remoteStream.map((value, index) => {
                console.log(value);
                return <h2>{value}</h2>;
            })} */}
            <div className={cx('footer')}>
                <Link
                    to={{
                        pathname: `/source/room/${lastRef}`,
                    }}
                    className={cx('out-class')}
                >
                    <FontAwesomeIcon icon={faPhoneSlash} />
                </Link>
            </div>
        </div>
    );
};

export default Class;
