'use client';
import { useState, useEffect } from 'react';
import { NextUIProvider } from '@nextui-org/react';
import Head from "next/head";

import Layout from "@/layout";
import Loading from '@/components/Loading';
import ReduxProvider from '@/redux';

import '@/public/styles/reset.css';
import '@/public/styles/tw.css';

export default function MyApp({ Component, pageProps }) {
    const [loading, setLoading] = useState(true),
        isSingle = Component.isSingle || null;

    useEffect(() => {
        let t = setTimeout(() => {
            clearTimeout(t);

            setLoading(false);
        }, 3000);
    }, []);

    return (
        <ReduxProvider>
            <NextUIProvider>
                <Head>
                    <title>{process.env.WEB_TITLE}</title>
                    <meta name="description" content={process.env.WEB_DESCRIPTION} />
                    <meta name="keywords" content={process.env.WEB_KEYWORDS} />
                    <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon" />
                </Head>

                {
                    loading ?
                        <Loading/>
                        :
                        (
                            isSingle ?
                                <Component {...pageProps} />
                                :
                                <Layout><Component {...pageProps} /></Layout>
                        )
                }
            </NextUIProvider>
        </ReduxProvider>
    );
}