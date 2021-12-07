import './LoginRegister.css';
import {
    IonButton,
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
import {useContext, useEffect, useRef} from "react";
import axios from "axios";
import { useHistory } from "react-router";
import UserContext from "../../data/user-context";
interface ContainerProps { }

const LoginContainer: React.FC<ContainerProps> = () => {
    const emailRef = useRef<HTMLIonInputElement>(null);
    const passwordRef = useRef<HTMLIonInputElement>(null);
    var loginUrl = "https://covid-umn.herokuapp.com/login";
    var greetUrl = "https://covid-umn.herokuapp.com/greet";
    const history = useHistory();
    const userContext = useContext(UserContext);

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

    const loginHandler = async () => {
        const enteredEmail = emailRef.current?.value;
        const enteredPassword = passwordRef.current?.value;

        if(enteredEmail?.toString() == "" || enteredPassword == ""){
            return;
        }

        const headers = {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + userContext.user.token
        }

        const data = {
            email: enteredEmail?.toString(),
            password: enteredPassword?.toString()
        }

        const instance = axios.create({
            headers: headers,
        });

        // instance.interceptors.request.use(request => {
        //     console.log('Starting Request', JSON.stringify(request, null, 2))
        //     return request
        // });

        instance.post(loginUrl, data).then((response) => {
            userContext.setToken(response.data.data.user_token, response.data.data.name)
            history.push("/home");
        }).catch((error) => {
            console.log(error.response)
        });
        
        history.push("/home");
    };

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
                    <IonInput placeholder="EMAIL" class="emailInput" type="text" ref={emailRef}><IonIcon class="emailInputIcon" icon={mail} slot="start"/></IonInput>
                </IonItem>
                <IonItem>
                    <IonInput placeholder="PASSWORD" class="passwordInput" type="password" ref={passwordRef}><IonIcon class="passwordInputIcon" icon={lockClosed} slot="start"/></IonInput>
                </IonItem>

                <IonSegment>
                    <IonSegmentButton class="loginButtonInLogin" onClick={loginHandler}>
                        <IonLabel>Login</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
            </IonCard>
        </IonContent>
    );
};

export default LoginContainer;
