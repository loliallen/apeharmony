export const generateTextShadow = (size: number, color: string) => {
    return `-${size}px -${size}px 0 ${color}, ${size}px -${size}px 0 ${color}, -${size}px ${size}px 0 ${color}, ${size}px ${size}px 0 ${color}`
}