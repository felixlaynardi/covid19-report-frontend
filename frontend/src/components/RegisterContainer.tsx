import './loginAndRegister.css';
import {
    IonCard, IonCol,
    IonContent, IonGrid,
    IonIcon,
    IonInput,
    IonItem,
    IonLabel,
    IonPage, IonRow,
    IonSegment,
    IonSegmentButton,
    IonBackButton
} from "@ionic/react";
import {lockClosed, mail, person} from "ionicons/icons";

interface ContainerProps { }

const RegisterContainer: React.FC<ContainerProps> = () => {
    return (
        <IonContent className="registerContent">
                <IonCard className="createAccountCard">
                    <h1>Create an Account!</h1>
                    <div className="registerText">
                        <p>Start </p>
                        <p className="redText">recovering </p>
                        <p>the earth with us!</p>
                    </div>
                    <IonItem>
                        <IonInput placeholder="NAME" class="nameInput"><IonIcon class="nameInputIcon" icon={person} slot="start"/></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput placeholder="EMAIL" class="emailInput"><IonIcon class="emailInputIcon" icon={mail} slot="start"/></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput placeholder="PASSWORD" class="passwordInput" type="password"><IonIcon class="passwordInputIcon" icon={lockClosed} slot="start"/></IonInput>
                    </IonItem>

                    <IonSegment>
                        <IonSegmentButton class="registerButtonInRegister">
                            <IonLabel>Register</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>

                    <IonGrid className="registerBottomGrid">
                        <IonRow>
                            <IonCol>
                                <p>Already have an account?</p>
                            </IonCol>
                            <IonCol>
                                <IonSegment>
                                    <IonSegmentButton class="loginButtonInRegister">
                                        <IonLabel>Login</IonLabel>
                                    </IonSegmentButton>
                                </IonSegment>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonCard>
        </IonContent>
    );
};

export default RegisterContainer;
