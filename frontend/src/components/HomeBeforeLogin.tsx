import './homeBeforeLogin.css';
import {
    createGesture, Gesture,
    IonButton,
    IonCard, IonCardHeader,
    IonCol, IonContent,
    IonGrid,
    IonImg,
    IonItem,
    IonLabel, IonModal,
    IonPage,
    IonRow,
    IonSegment, IonSegmentButton,
    IonText
} from "@ionic/react";
import {useEffect, useRef, useState} from "react";
import ExploreContainer from "./ExploreContainer";
import RegisterContainer from "./RegisterContainer";
import LoginContainer from "./LoginContainer";

interface ContainerProps { }

const HomeBeforeLogin: React.FC<ContainerProps> = () => {

    const [registerModal, setRegisterModal] = useState({isOpen: false})
    const [loginModal, setLoginModal] = useState({isOpen: false})

    return (
        <IonPage>
            <IonContent>
                <IonCard className="mainWelcome">

                    <div className="container">
                        <img src="https://i.ibb.co/TPp0SRG/virus.png"/>
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
                </IonCard>
            </IonContent>
            <IonModal isOpen={registerModal.isOpen}>
                <RegisterContainer/>
                <IonButton onClick={() => setRegisterModal({isOpen: false})}>
                    BACK</IonButton>
            </IonModal>
            <IonModal isOpen={loginModal.isOpen}>
                <LoginContainer/>
                <IonButton onClick={() => setLoginModal({isOpen: false})}>
                    BACK</IonButton>
            </IonModal>
        </IonPage>


    );
};

export default HomeBeforeLogin;
