import './LandingPage.css';

import LandingCase from '../../components/LandingPage/LandingCase/LandingCase'
import LottiePlayer from '../../components/LottiePlayer/LottiePlayer';
import Navbar from '../../components/Navbar/Navbar';

import virusAnimation from '../../assets/animation/virus.json'
import {IonButton, IonContent} from '@ionic/react';
import { useContext } from 'react';

import UserContext from "../../data/user-context";

const LandingPage: React.FC = () => {
  const userContext = useContext(UserContext);
    return(
      <IonContent>
      <Navbar/>
      <div className="landing-box-container">
        <div className="landing-box-inner">
          <div className="landing-box-top">
            <div className="landing-box-top-left">
              <div className="welcome-text">
                Welcome <span className="welcome-name">
                  {(() => {
                    if(userContext.user.name == ""){
                      return(<>Covid Fighter</>)
                    }else{
                      return(<>{userContext.user.name}</>)
                    }
                  })()}
                  </span>
                  ! <br/>
                <span className="welcome-subtitle">Let's Help Recover the Earth</span>
              </div>
                {(() => {
                  if (userContext.user.token == "") {
                    return (
                      <>
                        <IonButton expand="full" fill="clear" className="login-button" routerLink="/login">
                          Join now
                        </IonButton>
                      </>
                    )
                  } else {
                    return (
                      <>
                        <IonButton expand="full" fill="clear" className="login-button" routerLink="/profile">
                          View my profile
                        </IonButton>
                      </>
                    )
                  }
                })()}
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