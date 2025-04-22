import Particles from "./Particles"
import { motion, useSpring, useTransform } from "motion/react"
import { BackgroundEffect } from "~/constants/BackgroundEffect"
import { useEffect, memo } from "react"

export type GridProps = {
    animated: boolean,
    type: 'auth' | 'ban' | 'game' | 'profile' | 'default',
    iconsDensity?: number,
}

const GridBackground = memo((props: GridProps) => {

    const backgroundTheme = BackgroundEffect[props.type]['theme']

    const mouseX = useSpring(0, {
        stiffness: 200,
        mass: 0.2,
        damping: 60
    })

    const mouseY = useSpring(0, {
        stiffness: 200,
        mass: 0.2,
        damping: 60
    })

    const backgroundX = useTransform(mouseX, [-500, 500], [20, -20])
    const backgroundY = useTransform(mouseY, [-500, 500], [20, -20])

    const particlesX = useTransform(mouseX, [-500, 500], [30, -30])
    const particlesY = useTransform(mouseY, [-500, 500], [30, -30])

    const handleMouseMove = (event: MouseEvent) => {
        mouseX.set(event.clientX - window.innerWidth / 2)
        mouseY.set(event.clientY - window.innerHeight / 2)
    }

    useEffect(() => {
        if(!props.animated) return
        document.addEventListener("mousemove", handleMouseMove)

        return () => {
            document.removeEventListener("mousemove", handleMouseMove)
        }
    })

    return (
        <div
            className="absolute inset-0 z-0 grid"
        >
            <motion.div
                className="absolute inset-0 z-0"
                style={{
                    backgroundImage: `
                    linear-gradient(to right, ${backgroundTheme.gradient} 1px, transparent 1px),
                    linear-gradient(to bottom, ${backgroundTheme.gradient} 1px, transparent 1px)
                    `,
                    backgroundSize: "2.5rem 2.5rem",
                    maskImage:
                        "radial-gradient(circle at center, black, transparent 90%)",
                    x: backgroundX,
                    y: backgroundY,
                }}
            />
            {props.iconsDensity && props.type && (
                <motion.div 
                    className="absolute inset-0 z-0 overflow-hidden"
                    style={{
                        x: particlesX,
                        y: particlesY,
                    }}
                >
                    <Particles 
                        iconsDensity={props.iconsDensity} 
                        type={props.type} 
                    />
                </motion.div>
            )}
            <div className={`absolute inset-0 bg-gradient-to-b ${backgroundTheme.overlay} to-transparent`} />
        </div>
    )
})

export default GridBackground