export const stagesSpeedometer = [
    {
        id: 0,
        isActive: (progress: number) => true,
        image: "/images/steps-speedometer/stage-1.png"
    },
    {
        id: 1,
        isActive: (progress: number) => progress < 0,
        image: "/images/steps-speedometer/stage-2.png"
    },
    {
        id: 2,
        isActive: (progress: number) => progress <= -5,
        image: "/images/steps-speedometer/stage-3.png"
    },
    {
        id: 3,
        isActive: (progress: number) => progress <= -10,
        image: "/images/steps-speedometer/stage-4.png"
    },
    {
        id: 4,
        isActive: (progress: number) => progress <= -15,
        image: "/images/steps-speedometer/stage-5.png"
    },
    {
        id: 4,
        isActive: (progress: number) => progress < -20,
        image: "/images/steps-speedometer/stage-6.png"
    }
]