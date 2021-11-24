import { IconButton } from '@mui/material'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { FaVolumeOff, FaVolumeUp } from "react-icons/fa"

const UP = 0.5
const OFF = 0

type IPlayerContext = {
    toggle?: (e: React.MouseEvent<HTMLButtonElement>) => void
    audioEl: React.RefObject<HTMLAudioElement> | null,
    vVolume: number,
    disabled: boolean,
    disable?: (v?: boolean) => void
}
const PlayerContext = React.createContext<IPlayerContext>({
    audioEl: null,
    vVolume: UP,
    disabled: false
})


export const PlayerProvider: React.FC = ({ children }) => {
    const [tries, setTries] = useState(0)
    const [vV, setVV] = useState(UP)
    const [disabled, setDisabled] = useState(false)
    const audioEl = useRef<HTMLAudioElement>(null)

    useEffect(() => {
        function startPlay() {
            if (audioEl.current) {
                audioEl.current.loop = true
                audioEl.current.volume = UP
                audioEl.current.play().then(() => { }).catch(() => { setTries(p => p + 1) })
            }
        }
        if (!disabled)
            startPlay()
    }, [tries, disabled])

    useEffect(()=>{
        function tryToStop(){
            if (audioEl.current) {
                audioEl.current.pause()
            }
        }
        if (disabled) {
            tryToStop()
        }
    },[disabled])

    useEffect(() => {
        if (localStorage.getItem('playerDisabled')) {
            if (audioEl.current)
                audioEl.current.volume = OFF
        }
    }, [])

    const toggle = () => {
        if (audioEl.current && !disabled) {
            const v = audioEl.current.volume
            console.log("volume", v)
            if (v === UP) {
                setVV(OFF)
                localStorage.setItem('playerDisabled', '1')
            } else {
                setVV(UP)
                localStorage.removeItem('playerDisabled')
            }
            audioEl.current.volume = v === OFF ? UP : OFF
        }
    }

    const disable = (v = true) => {
        console.log('Trying to disable')
        setDisabled(v)
    }

    return (
        <PlayerContext.Provider value={{ toggle, audioEl, vVolume: vV, disabled, disable }}>
            {!disabled && <audio src="/music.mp3" ref={audioEl} id="background-theme" hidden />}
            {children}
        </PlayerContext.Provider>
    )
}

type Props = {
    inverse?: boolean
}

export const usePlayer = () => useContext(PlayerContext)

export const Player: React.FC<Props> = ({ inverse }) => {
    const { audioEl, toggle, vVolume, disabled } = usePlayer()
    const color = inverse ? "#000" : "#fff"

    if (disabled)
        return null

    return <IconButton
        sx={{
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
        aria-label="volume-control"
        onClick={toggle}
    >{
            !(audioEl?.current && vVolume === OFF) ?
                <FaVolumeUp color={color} />
                :
                <FaVolumeOff color={color} />}
    </IconButton>
}