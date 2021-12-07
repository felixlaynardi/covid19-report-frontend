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
    IonSegmentButton,
    IonBackButton
} from "@ionic/react";
import {calendar,lockClosed, mail, person} from "ionicons/icons";
import {useRef, useState, useEffect, useContext} from "react";
import axios from "axios";
import { useHistory } from "react-router";
import UserContext from "../../data/user-context";
import { useToast } from "@agney/ir-toast";
interface ContainerProps { }

const RegisterContainer: React.FC<ContainerProps> = () => {
    const nameRef = useRef<HTMLIonInputElement>(null);
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passwordRef = useRef<HTMLIonInputElement>(null);
    const[myDateOfBirth, setMyDateOfBirth] = useState(new Date());
    var registerUrl = "https://covid-umn.herokuapp.com/register";
    var greetUrl = "https://covid-umn.herokuapp.com/greet";
    const history = useHistory();
    const userContext = useContext(UserContext);
    const Toast = useToast();

    useEffect(() => {
        async function checkTokenExistOrNot () {
            if(userContext.user.token != ""){
                const headers = {
                    "Content-Type": "application/json",
                    "Authorization" : "Bearer " + userContext.user.token
                }
                const instance = axios.create({
                    headers: headers,
                });    

                instance.get(greetUrl).then((response) => {
                    history.push("/home");
                }).catch((error) => {
                    userContext.setToken("", "");
                });
            }
        }
        checkTokenExistOrNot();
    }, [])

    const registerHandler = async () => {
        const enteredName = nameRef.current?.value;
        const enteredEmail = emailRef.current?.value;
        const enteredPassword = passwordRef.current?.value;

        if(enteredEmail?.toString() == "" || enteredPassword == "" || enteredName?.toString() == "" || !myDateOfBirth){
            return;
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + userContext.user.token
        }

        const data = {
            name: enteredName?.toString(),
            email: enteredEmail?.toString(),
            password: enteredPassword?.toString(),
            date_of_birth: myDateOfBirth + "T00:00:00Z"
        }

        const instance = axios.create({
            headers: headers,
        });

        instance.post(registerUrl, data).then((response) => {
            userContext.setToken(response.data.data.user_token, response.data.data.name);
            Toast.success('Registration success');
            history.push("/home");
        }).catch((error) => {
            console.log(error)
            Toast.error("Registration failed");
        });
    };

    return (
        <IonContent className="registerContent">
                <IonCard className="createAccountCard">
                    <h1>Create an Account!</h1>
                    <div className="registerText">
                        <p>Start </p>
                        <p className="redText">recovering </p>
                        <p>the earth with us!</p>
                    </div>
                    <IonItem className="inputItems">
                        <IonInput placeholder="NAME" class="nameInput" ref={nameRef}><IonIcon class="nameInputIcon" icon={person} slot="start"/></IonInput>
                    </IonItem>
                    <IonItem className="inputItems">
                        <IonInput placeholder="EMAIL" class="emailInput" ref={emailRef}><IonIcon class="emailInputIcon" icon={mail} slot="start"/></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonInput placeholder="DATE OF BIRTH" class="editProfileInput" type="date" onIonChange={(e: any) => setMyDateOfBirth(e.target.value)}><IonIcon class="inputIcon" icon={calendar} slot="start"/></IonInput>
                    </IonItem>
                    <IonItem className="inputItems">
                        <IonInput placeholder="PASSWORD" class="passwordInput" type="password" ref={passwordRef}><IonIcon class="passwordInputIcon" icon={lockClosed} slot="start"/></IonInput>
                    </IonItem>

                    <IonSegment>
                        <IonSegmentButton class="registerButtonInRegister" onClick={registerHandler}>
                            <IonLabel>Register</IonLabel>
                        </IonSegmentButton>
                    </IonSegment>

                </IonCard>
        </IonContent>
    );
};

export default RegisterContainer;
