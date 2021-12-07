import {
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonBackButton,
    IonLabel, IonButton, IonInput, IonItem, IonIcon, isPlatform, IonDatetime
} from "@ionic/react";
import './EditProfile.css';
import {calendar, fitness, heart, mail, person} from "ionicons/icons";
import {useContext, useEffect, useState} from "react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
// import {Directory, Filesystem} from "@capacitor/filesystem";
import UserContext from "../../data/user-context";
import { useHistory } from "react-router";
import axios from "axios";

import './EditProfile.css';
const EditProfile: React.FC = () => {
    const userContext = useContext(UserContext);
    var getUserUrl = "http://localhost:4747/user";
    const history = useHistory();
    var dateOfBirth = "";

    const[myFullName, setMyFullName] = useState<string>('John Doe');
    const[myProfilePicture, setMyProfilePicture] = useState<string>('https://i.ibb.co/WHrxLMF/profilepic.png');
    const[myVaccineStatus, setMyVaccineStatus] = useState<string>('Vaccine Undocumented');
    const[myVaccineType, setMyVaccineType] = useState<string>('');
    const[myHealthStatus, setMyHealthStatus] = useState<string>('Unknown Health Status');
    const[myLastHealthCheck, setMyLastHealthCheck] = useState<number>(0);
    const[myLatitude, setMyLatitude] = useState<string|number>(0);
    const[myLongitude, setMyLongitude] = useState<string|number>(0);
    const[myDateOfBirth, setMyDateOfBirth] = useState(new Date());
    const[myEmail, setMyEmail] = useState<string>();

    const[myCerti1, setMyCerti1] = useState<string>('https://i.ibb.co/RbzWjSL/blank.png');
    const[myCerti2, setMyCerti2] = useState<string>('https://i.ibb.co/RbzWjSL/blank.png');


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

                instance.get(getUserUrl).then((response) => {
                    console.log(response)
                    setMyFullName(response.data.data.name)
                    if (response.data.data.vaccine_type != "") {
                        setMyVaccineType(response.data.data.vaccine_type)
                    }
                    if (response.data.data.health_status != "") {
                        setMyHealthStatus(response.data.data.health_status)
                    }
                    if (response.data.data.vaccine_certificate_1 != "") {
                        setMyCerti1(response.data.data.vaccine_certificate_1)
                    }
                    if (response.data.data.vaccine_certificate_2 != "") {
                        setMyCerti2(response.data.data.vaccine_certificate_2)
                    }
                    if(response.data.data.profile_picture != ""){
                        setMyProfilePicture(response.data.data.profile_picture)
                    }
                    setMyEmail(response.data.data.email)
                    setMyLatitude(response.data.data.lat)
                    setMyLongitude(response.data.data.lng)
                    setMyDateOfBirth(response.data.data.date_of_birth)
                    dateOfBirth = response.data.data.date_of_birth;
                }).catch((error) => {
                    userContext.setToken("", "");
                    history.push('/login');
                });
            } else {
                history.push('/login');
            }
        }
        checkTokenExistOrNot();
    }, [])

    const [takenPhoto, setTakenPhoto] = useState<{
        path: string;
        preview: string
    }>();

    const takePhotoHandlerProfpic = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        
        if(!photo || !photo.path || !photo.webPath){
            return;
        }
        
        setMyProfilePicture(photo.webPath.toString())
    };

    const takePhotoHandlerCert1 = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        // console.log(photo);
        if(!photo || !photo.path || !photo.webPath){
            return;
        }
        
        setMyCerti1(photo.webPath)
    };

    const takePhotoHandlerCert2 = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        // console.log(photo);
        if(!photo || !photo.path || !photo.webPath){
            return;
        }

        setMyCerti2(photo.webPath)
    };


    const saveDataHandler = async () => {
        const headers = {
            "Content-Type": "multipart/form-data",
            "Authorization" : "Bearer " + userContext.user.token
        }
        
        var formData = new FormData();
        formData.append('name', myFullName)
        formData.append('certificate_1', myCerti1)
        formData.append('certificate_2', myCerti2)
        formData.append('profile_picture', myProfilePicture.toString())
        if(dateOfBirth != myDateOfBirth.toString()){
            formData.append('date_of_birth', myDateOfBirth.toString() + "T00:00:00Z")
        }else{
            formData.append('date_of_birth', myDateOfBirth.toString())
        }
        formData.append('health_status', myHealthStatus)
        formData.append('lat', myLatitude.toString())
        formData.append('lng', myLongitude.toString())
        formData.append('vaccine_type', myVaccineType)
        
        const instance = axios.create({
            headers: headers,
        });
        
        // instance.interceptors.request.use(request => {
        //     console.log('Starting Request', JSON.stringify(request, null, 2))
        //     return request
        // });
        instance.patch(getUserUrl, formData).then((response) => {
            history.push("/profile");
        }).catch((error) => {
            console.log(error)
        });
        history.push("/profile");
    }

    return (
        <IonPage>
            <IonHeader class="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/profile"/>
                        {isPlatform('android') && (
                            <IonLabel class="backText">Back</IonLabel>
                        )}
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                    <div className="editProfileContainer">
                        <img src={myProfilePicture}/>
                        <IonButton expand="full" fill="clear" className="changePhotoButton" onClick={takePhotoHandlerProfpic}>Change Photo</IonButton>
                    </div>
                    <div className="editTitles">
                        <h1>My Details:</h1>
                    </div>
                    <div>
                        <IonItem>
                            <IonInput placeholder="FULL NAME" class="editProfileInput" onIonInput={(e: any) => setMyFullName(e.target.value)} value={myFullName}><IonIcon class="inputIcon" icon={person} slot="start"/></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder="EMAIL" class="editProfileInput" onIonInput={(e: any) => setMyEmail(e.target.value)} value={myEmail} disabled><IonIcon class="inputIcon" icon={mail} slot="start"/></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder="MY HEALTH STATUS" class="editProfileInput" onIonInput={(e: any) => setMyHealthStatus(e.target.value)} value={myHealthStatus}><IonIcon class="inputIcon" icon={heart} slot="start"/></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder="DATE OF BIRTH" class="editProfileInput" type="date" onIonChange={(e: any) => setMyDateOfBirth(e.target.value)}><IonIcon class="inputIcon" icon={calendar} slot="start"/></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder="VACCINE TYPE" class="editProfileInput" onIonInput={(e: any) => setMyVaccineType(e.target.value)} value={myVaccineType}><IonIcon class="inputIcon" icon={fitness} slot="start"/></IonInput>
                        </IonItem>
                    </div>
                    <div className="certificateTitle">
                        <h1>Certificates:</h1>
                    </div>
                    <div className="certificates">
                        <img src={myCerti1}/>
                        <IonButton expand="full" fill="clear" className="changePhotoButton" onClick={takePhotoHandlerCert2}>Upload Certificate 1</IonButton>
                        <img src={myCerti2}/>
                        <IonButton expand="full" fill="clear" className="changePhotoButton" onClick={takePhotoHandlerCert2}>Upload Certificate 2</IonButton>
                    </div>

                    <IonButton expand="full" fill="clear" className="saveButton" onClick={saveDataHandler}>SAVE</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default EditProfile;