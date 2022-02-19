import {
    Drawer,
    IconButton,
    Typography,
    useMediaQuery,
    useTheme,
    Box,
} from "@material-ui/core";
import Link from "next/link";
import {AiOutlineMenu, AiOutlineClose} from "react-icons/ai";
import {FaDiscord, FaTwitter} from "react-icons/fa";
import {useState} from "react";
import cn from 'classnames'

import {Logo} from "../Logo";
import {Player} from "../../components/Player";
import {ConnectWalletButton} from "../ConnectWalletButton";
import styles from "./style.module.scss";

const DesktopLinks = () => {
    return (
        <>
            <IconButton style={{padding: 0}}>
                <a
                    target="_blank"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    href="https://twitter.com/ApeHarmony"
                >
                    <FaTwitter color="#fff"/>
                </a>
            </IconButton>
            <IconButton style={{padding: 0}}>
                <a
                    target="_blank"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    href="https://opensea.io/collection/apeharmonymonsterclub"
                >
                    <img width={34} height={34} src="/opensea.svg" alt="opensea-icon"/>
                </a>
            </IconButton>
            <a
                target="_blank"
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
                href="https://discord.gg/apeharmony"
            >
                <IconButton style={{padding: 0}}>
                    <FaDiscord color="#fff"/>
                </IconButton>
            </a>
        </>
    );
};

type Props = {
    offMusic?: boolean;
    musicUrl?: string;
    refs?: { ref: React.RefObject<HTMLDivElement>; label: string }[];
    links?: { to: string; href?: string; label: string }[];
};
export const Header: React.FC<Props> = (
    {
        offMusic,
        refs,
        links,
        musicUrl,
    }
) => {
    const t = useTheme();
    const lg = useMediaQuery(t.breakpoints.down("lg"));
    const sm = useMediaQuery(t.breakpoints.down("sm"));

    const [open, set] = useState(false);
    const toggle = () => set((p) => !p);

    const handleClickRef = (ref: React.RefObject<HTMLDivElement>) => () => {
        toggle();
        setTimeout(() => {
            ref.current && ref.current.scrollIntoView({behavior: "smooth"});
        }, 500);
    };
    return (
        <div className={styles.header}>
            <div className={cn(styles.header_left, styles.link)}>
                <Link href="/">
                    <Logo/>
                </Link>
            </div>

            {!lg && (
                <div
                    style={{
                        display: "flex",
                        gap: "4rem",
                        justifyContent: "space-around",
                        flex: 1,
                        margin: "0px 10%",
                        alignItems: "center",
                    }}
                >
                    {refs &&
                        refs.map(({ref, label}, i) => (
                            <Typography
                                key={i}
                                style={{cursor: "pointer"}}
                                variant="body1"
                                onClick={() =>
                                    ref.current &&
                                    ref.current.scrollIntoView({behavior: "smooth"})
                                }
                            >
                                {label}
                            </Typography>
                        ))}
                    {links &&
                        links.map(({label, href, to}, i) =>
                            href ? (
                                <a
                                    target="_blank"
                                    href={href}
                                    key={i}
                                    style={{textDecoration: "none"}}
                                >
                                    <Typography variant="body1">
                                        {label}
                                    </Typography>
                                </a>
                            ) : (
                                <Link href={to!} key={i}>
                                    <Typography variant="body1" style={{textDecoration: "none"}}
                                                className={styles.link}>
                                        {label}
                                    </Typography>
                                </Link>
                            )
                        )}
                </div>
            )}
            {!lg ? (
                <div className={styles.header_right}>
                    {!offMusic && <Player musicUrl={musicUrl}/>}
                    <DesktopLinks/>
                    <ConnectWalletButton/>
                </div>
            ) : (
                <div
                    style={{
                        display: "flex",
                        paddingRight: "1rem",
                    }}
                >
                    {!offMusic && <Player/>}
                    <IconButton onClick={toggle}>
                        <AiOutlineMenu color="white"/>
                    </IconButton>
                </div>
            )}
            <Drawer open={open} anchor="right" onClose={toggle}>
                <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    width={sm ? "100vw" : "600px"}
                    height={sm ? "100vh" : "50vh"}
                    position="relative"
                >
                    {sm && (
                        <div
                            style={{position: "absolute", right: "0.5rem", top: "0.5rem"}}
                        >
                            <IconButton onClick={toggle}>
                                <AiOutlineClose color="white"/>
                            </IconButton>
                        </div>
                    )}
                    <div
                        style={{
                            width: "50%",
                            marginBottom: "2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <ConnectWalletButton/>
                    </div>
                    {refs &&
                        refs.map(({ref, label}, i) => (
                            <Typography
                                key={i}
                                style={{textDecoration: "underline", cursor: "pointer"}}
                                variant="h5"
                                onClick={handleClickRef(ref)}
                            >
                                {label}
                            </Typography>
                        ))}
                    {links &&
                        links.map(({to, href, label}, i) =>
                            href ? (
                                <a
                                    target="_blank"
                                    href={href}
                                    key={i}
                                    style={{textDecoration: "none"}}
                                >
                                    <Typography variant="body1">
                                        {label}
                                    </Typography>
                                </a>
                            ) : (
                                <Link href={to!} key={i}>
                                    <Typography variant="body1" style={{textDecoration: "none"}}
                                                className={styles.link}>
                                        {label}
                                    </Typography>
                                </Link>
                            )
                        )}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            width: "50%",
                            marginTop: "2rem",
                        }}
                    >
                        <DesktopLinks/>
                    </div>
                </Box>
            </Drawer>
        </div>
    );
};
