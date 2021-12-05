import { VolumeOff, VolumeUp } from "@mui/icons-material";
import { Icon, IconButton } from "@mui/material";
import React, { useState, useEffect, useRef, MutableRefObject, useMemo } from "react";

type Props = {
    // userFlag: boolean
    musicUrl?: string
}

export const Player: React.FC<Props> = ({ musicUrl = "/music.mp3" }) => {
    const [tries, setTries] = useState(0)
    const [toggled, setToggled] = useState(false)
    const audioEl = useRef<HTMLAudioElement>(null)

    function onAudioEnd(this: HTMLAudioElement) {
        this.play()
    }
    useEffect(() => {
        function startPlay() {
            if (audioEl.current) {
                audioEl.current.loop = true
                audioEl.current.play().then(() => { }).catch(() => { setTries(p => p + 1) })
            }
        }
        startPlay()
    }, [tries])

    const toggle = () => {
        if (audioEl.current) {
            const v = audioEl.current.volume
            audioEl.current.volume = v === 0 ? 1 : 0
        }
        setToggled(p => !p)
    }
    const iconSize = useMemo(() => 28, [])
    return (
        <>
            <audio src={musicUrl} ref={audioEl} id="background-theme"></audio>
            <IconButton
                color={!(audioEl.current && audioEl.current.volume === 0) ? "primary" : "secondary"}
                onClick={toggle}
                sx={{
                    // backgroundColor: "#999999",
                    marginTop: '2px',
                    paddingRight: 0
                }}
            >
                {!(audioEl.current && audioEl.current.volume === 0) ? <VolumeUp /> : <VolumeOff />}
            </IconButton>
        </>
    );
};
