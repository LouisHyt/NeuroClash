import { motion, type MotionValue } from "motion/react"

type GridBackgroundProps = {
    backgroundX: MotionValue<number>
    backgroundY: MotionValue<number>
}

const GridBackground = ({ backgroundX, backgroundY }: GridBackgroundProps) => {

    return (
        <>
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "2.5rem 2.5rem",
                    maskImage:
                        "radial-gradient(circle at center, black, transparent 80%)",
                    x: backgroundX,
                    y: backgroundY,
                }}
            />
        </>
    )
}


export default GridBackground