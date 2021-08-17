import './LandingPage.css';

import LandingCase from './LandingCase/LandingCase.js'
import LottiePlayer from '../LottiePlayer/LottiePlayer';

import virusAnimation from '../../assets/animation/virus.json'

export default function LandingPage(){
    return(
      <div className="landing-box-container">
        <div className="landing-box-inner">
          <div className="landing-box-top">
            <div className="landing-box-top-left">
              <div className="welcome-text">
                Welcome <span className="welcome-name">Nael</span>! <br/>
                <span className="welcome-subtitle">Let's Help Recover the Earth</span>
              </div>
              <button className="dashboard-button">
                Dashboard
              </button>
            </div>
            <div className="landing-box-top-right">
              <LottiePlayer animation={virusAnimation} animationClass={"virus-animation"}/>
            </div>
          </div>
          <LandingCase/>
        </div>
      </div>
    )
}