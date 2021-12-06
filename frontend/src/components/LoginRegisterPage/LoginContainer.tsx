import './LoginRegister.css';
import {
    IonCard, IonCol,
    IonContent, IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage, IonRow,
    IonSegment,
    IonSegmentButton
} from "@ionic/react";
import {lockClosed, mail, person} from "ionicons/icons";

interface ContainerProps { }

const LoginContainer: React.FC<ContainerProps> = () => {
    return (
        <IonContent className="loginContent">
            <IonCard className="loginCard">
                <h1>Welcome Back!</h1>
                <div className="loginText">
                    <p>Let's get you </p>
                    <p className="redText">back </p>
                    <p>in!</p>
                </div>
                <IonItem>
                    <IonInput placeholder="EMAIL" class="emailInput"><IonIcon class="emailInputIcon" icon={mail} slot="start"/></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput placeholder="PASSWORD" class="passwordInput" type="password"><IonIcon class="passwordInputIcon" icon={lockClosed} slot="start"/></IonInput>
                </IonItem>

                <IonSegment>
                    <IonSegmentButton class="loginButtonInLogin">
                        <IonLabel>Login</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </IonCard>
        </IonContent>
    );
};

export default LoginContainer;
