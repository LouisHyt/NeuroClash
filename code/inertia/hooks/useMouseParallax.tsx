import { useSpring, useTransform } from "motion/react"

export default function useMouseParallax() {
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

  const handleMouseMove = (event: React.MouseEvent) => {
    mouseX.set(event.clientX - window.innerWidth / 2)
    mouseY.set(event.clientY - window.innerHeight / 2)
  }

  const backgroundX = useTransform(mouseX, [-500, 500], [20, -20])
  const backgroundY = useTransform(mouseY, [-500, 500], [20, -20])

  return {
    handleMouseMove,
    backgroundX,
    backgroundY
  }
}