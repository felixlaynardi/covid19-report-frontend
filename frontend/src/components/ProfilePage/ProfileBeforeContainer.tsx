import './ProfileBefore.css';
import {
    IonButton,
    IonCard,
    IonContent,
    IonLabel, IonModal,
    IonPage,
    IonSegment, IonSegmentButton
} from "@ionic/react";
import {useEffect, useRef, useState} from "react";
import RegisterContainer from "../LoginRegisterPage/RegisterContainer";
import LoginContainer from "../LoginRegisterPage/LoginContainer";
import Navbar from '../../components/Navbar/Navbar';

import LottiePlayer from '../../components/LottiePlayer/LottiePlayer';
import virusAnimation from '../../assets/animation/virus.json'

interface ContainerProps { }

const ProfileBeforeContainer: React.FC<ContainerProps> = () => {

    const [registerModal, setRegisterModal] = useState({isOpen: false})
    const [loginModal, setLoginModal] = useState({isOpen: false})

    return (
        <IonPage>
            <IonContent>
                <Navbar/>
                {/* <IonCard className="mainWelcome"> */}
                    <div className="before-container">
                        <LottiePlayer animation={virusAnimation} animationClass={"virus-animation"}/>
                        <h1>Let's Help Recover the Earth!</h1>
                        <div className="welcomeText">
                            <p>An all in one applicaition to help you</p>
                            <p className="redText"> stay safe </p>
                            <p>from covid, </p>
                            <p className="redText">store </p>
                            <p>the necessary documents, and get </p>
                            <p className="redText">valuable insight</p>
                            <p>on what's currently happening.</p>
                        </div>
                        <div>
                            <IonSegment class="registerOrLoginButtons">
                                <IonSegmentButton class="registerButton"
                                                  onClick={()=> setRegisterModal({isOpen: true})}>
                                    <IonLabel>Register</IonLabel>
                                </IonSegmentButton>
                                <IonSegmentButton class="loginButton"
                                                  onClick={()=> setLoginModal({isOpen: true})}>
                                    <IonLabel>Login</IonLabel>
                                </IonSegmentButton>
                            </IonSegment>
                        </div>
                    </div>
                {/* </IonCard> */}
            </IonContent>
            <IonModal isOpen={registerModal.isOpen}>
                <RegisterContainer/>
                <IonButton className="backButtonProfileBefore" onClick={() => setRegisterModal({isOpen: false})}>
                    BACK</IonButton>
            </IonModal>
            <IonModal isOpen={loginModal.isOpen}>
                <LoginContainer/>
                <IonButton className="backButtonProfileBefore" onClick={() => setLoginModal({isOpen: false})}>
                    BACK</IonButton>
            </IonModal>
        </IonPage>


    );
};

export default ProfileBeforeContainer;
