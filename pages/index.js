import { useEffect, useState, useRef } from 'react';
import Head from 'next/head'
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { setUserInfo } from '@/redux/reducers/main';
import styles from './index.module.scss';

export default props => {
    const initState = () => ({}),
        [state, setState] = useState(initState),
        router = useRouter(),
        dispatch = useDispatch();

    const redirect = () => {
        dispatch(setUserInfo({id: 1, name: '汤姆'}));
        router.push('/about');
    };
    useEffect(() => {}, []);

    return (
        <div className={styles['container']}>
            <Head>
                <title>定制页面TITLE</title>
            </Head>
            我是首页
            <div></div>
            <Button size="sm" color="primary" onClick={redirect}>Click me</Button>
        </div>
    )
}
