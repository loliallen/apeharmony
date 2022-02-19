import * as React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import { ServerStyleSheets } from '@material-ui/core/styles';

import {theme} from '../app/theme';

export default class MyDocument extends Document<{ emotionStyleTags: any }> {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="utf-8"/>
                    <link rel="icon" href="/logo100x100.png"/>
                    <meta name="theme-color" content="#000000"/>
                    <meta
                        name="description"
                        content="Apeharmony"
                    />
                    <link rel="apple-touch-icon" href="/logo261x60.png"/>
                    <link rel="manifest" href="/manifest.json"/>
                    <meta name="theme-color" content={theme.palette.primary.main}/>
                    <link rel="shortcut icon" href="/static/favicon.ico"/>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    {/* Inject MUI styles first to match with the prepend: true configuration. */}
                </Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        );
    }
}

MyDocument.getInitialProps = async (ctx) => {

    // Render app and page and get the context of the page with collected side effects.
    const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () => originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};