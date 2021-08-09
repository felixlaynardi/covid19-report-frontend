import React from 'react'
import Lottie from 'react-lottie-player'
 
const LottiePlayer = (props) => {
  return (
    <Lottie className={props.animationClass} loop animationData={props.animation} play/>
  )
}

export default LottiePlayer;