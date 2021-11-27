import React from 'react'
import Lottie from 'react-lottie-player'
 
interface LottiePlayer {
  animationClass: string
  // lottie json file
  animation: any
}

const LottiePlayer: React.FC<LottiePlayer> = (props) => {
  return (
    <Lottie className={props.animationClass} loop animationData={props.animation} play/>
  )
}

export default LottiePlayer;