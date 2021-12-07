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
import { Directory, Filesystem } from "@capacitor/filesystem"
import { base64FromPath } from "@ionic/react-hooks/filesystem"
import { useToast } from "@agney/ir-toast";

import { Redirect, Route } from 'react-router-dom';

import './EditProfile.css';
const EditProfile: React.FC = () => {
    const userContext = useContext(UserContext);
    var getUserUrl = "https://covid-umn.herokuapp.com/user";
    const history = useHistory();
    var dateOfBirth = "";
    const Toast = useToast();

    const[myFullName, setMyFullName] = useState<string>('John Doe');
    const[myProfilePicture, setMyProfilePicture] = useState<string>('https://i.ibb.co/WHrxLMF/profilepic.png');
    const[updateProfilePic, setUpdateProfilePic] = useState<boolean>(false);
    const[myVaccineStatus, setMyVaccineStatus] = useState<string>('Vaccine Undocumented');
    const[myVaccineType, setMyVaccineType] = useState<string>('');
    const[myHealthStatus, setMyHealthStatus] = useState<string>('Unknown Health Status');
    const[myLastHealthCheck, setMyLastHealthCheck] = useState<number>(0);
    const[myLatitude, setMyLatitude] = useState<string|number>(0);
    const[myLongitude, setMyLongitude] = useState<string|number>(0);
    const[myDateOfBirth, setMyDateOfBirth] = useState('' as any);
    const[myEmail, setMyEmail] = useState<string>();

    const[myCerti1, setMyCerti1] = useState<string>('https://i.ibb.co/RbzWjSL/blank.png');
    const[updateCerti1, setUpdateCerti1] = useState<boolean>(false);
    const[myCerti2, setMyCerti2] = useState<string>('https://i.ibb.co/RbzWjSL/blank.png');
    const[updateCerti2, setUpdateCerti2] = useState<boolean>(false);


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
                    let dateOfBirth = new Date(response.data.data.date_of_birth)
                    let year = dateOfBirth.getFullYear()
                    let month = dateOfBirth.getMonth()
                    month++
                    let monthStr = ""
                    if(month < 10){
                        monthStr += "0"
                    }
                    monthStr += month.toString()
                    let days = dateOfBirth.getDate()
                    let daysStr = ""
                    if(days < 10){
                        daysStr += "0"
                    }
                    daysStr += days.toString()
                    console.log(`${year}-${monthStr}-${daysStr}`)
                    setMyDateOfBirth(`${year}-${monthStr}-${daysStr}`)
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

    const takePhotoHandlerProfpic = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        
        if(!photo || !photo.webPath){
            return;
        }
        
        setMyProfilePicture(photo.webPath.toString())
        setUpdateProfilePic(true)
        console.log(myProfilePicture)
    };

    const takePhotoHandlerCert1 = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        // console.log(photo);
        if(!photo || !photo.webPath){
            return;
        }
        
        setMyCerti1(photo.webPath)
        setUpdateCerti1(true)
    };

    const takePhotoHandlerCert2 = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        // console.log(photo);
        if(!photo || !photo.webPath){
            return;
        }

        setMyCerti2(photo.webPath)
        setUpdateCerti2(true)
    };


    const saveDataHandler = async () => {
        const headers = {
            "Content-Type": "multipart/form-data",
            "Authorization" : "Bearer " + userContext.user.token
        }
        var formData = new FormData();

        let fileName;
        let base64;
        let response;
        let data;
        let metadata;
        
        if(updateProfilePic){
            fileName = new Date().getTime() + '.jpeg';
            base64 = await base64FromPath(myProfilePicture!);
            await Filesystem.writeFile({
                path: fileName,
                data: base64,
                directory: Directory.Data
            });

            response = await fetch(base64);
            data = await response.blob();
            metadata = {
                type: 'image/jpeg'
            };
            let fileProfile = new File([data], fileName, metadata);
            formData.append('profile_picture', fileProfile)
            console.log(fileProfile)
        }

        if(updateCerti1){
            fileName = new Date().getTime() + '.jpeg';
            base64 = await base64FromPath(myCerti1!);
            await Filesystem.writeFile({
                path: fileName,
                data: base64,
                directory: Directory.Data
            });

            response = await fetch(base64);
            data = await response.blob();
            metadata = {
                type: 'image/jpeg'
            };
            let filecerti1 = new File([data], fileName, metadata);
            formData.append('certificate_1', filecerti1)
            console.log(filecerti1)
        }

        if(updateCerti2){
            fileName = new Date().getTime() + '.jpeg';
            base64 = await base64FromPath(myCerti2!);
            await Filesystem.writeFile({
                path: fileName,
                data: base64,
                directory: Directory.Data
            });

            response = await fetch(base64);
            data = await response.blob();
            metadata = {
                type: 'image/jpeg'
            };
            let filecerti2 = new File([data], fileName, metadata);
            formData.append('certificate_2', filecerti2)
            console.log(filecerti2)
        }
        
        formData.append('name', myFullName)
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
        
        instance.patch(getUserUrl, formData).then((response) => {
            console.log(response)
            Toast.success("Update data Success");
        }).catch((error) => {
            console.log(error)
            Toast.success("Update data Failed");
        });
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
                            <IonInput placeholder="DATE OF BIRTH" class="editProfileInput" type="date" onIonChange={(e: any) => setMyDateOfBirth(e.target.value)} value={myDateOfBirth}><IonIcon class="inputIcon" icon={calendar} slot="start"/></IonInput>
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
                        <IonButton expand="full" fill="clear" className="changePhotoButton" onClick={takePhotoHandlerCert1}>Upload Certificate 1</IonButton>
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