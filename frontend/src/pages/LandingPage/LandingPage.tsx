import './LandingPage.css';

import LandingCase from '../../components/LandingPage/LandingCase/LandingCase'
import LottiePlayer from '../../components/LottiePlayer/LottiePlayer';
import Navbar from '../../components/Navbar/Navbar';

import virusAnimation from '../../assets/animation/virus.json'
import {IonButton, IonContent} from '@ionic/react';

const LandingPage: React.FC = () => {
    return(
      <IonContent>
      <Navbar/>
      <div className="landing-box-container">
        <div className="landing-box-inner">
          <div className="landing-box-top">
            <div className="landing-box-top-left">
              <div className="welcome-text">
                Welcome <span className="welcome-name">Nael</span>! <br/>
                <span className="welcome-subtitle">Let's Help Recover the Earth</span>
              </div>
              <IonButton expand="full" fill="clear" className="login-button" routerLink="/profile">
                Join now
              </IonButton>
            </div>
            <div className="landing-box-top-right">
              <LottiePlayer animation={virusAnimation} animationClass={"virus-animation"}/>
            </div>
          </div>
          <LandingCase/>
        </div>
      </div>
      </IonContent>
    )
}

export default LandingPage;