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
import {calendar, fitness, mail, person} from "ionicons/icons";
import {useState} from "react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
// import {Directory, Filesystem} from "@capacitor/filesystem";

import './EditProfile.css';
const EditProfile: React.FC = () => {


    const[myFullName, setMyFullName] = useState<string>('John Doe');
    const[myProfilePicture, setMyProfilePicture] = useState<string>('https://i.ibb.co/WHrxLMF/profilepic.png');
    const[myVaccineStatus, setMyVaccineStatus] = useState<string>('Vaccine Undocumented');
    const[myVaccineType, setMyVaccineType] = useState<string>('');
    const[myHealthStatus, setMyHealthStatus] = useState<string>('Unknown Health Status');
    const[myLastHealthCheck, setMyLastHealthCheck] = useState<number>(0);

    const[myDateOfBirth, setMyDateOfBirth] = useState(new Date());
    const[myEmail, setMyEmail] = useState<string>();

    const[myCerti1, setMyCerti1] = useState<string>('https://i.ibb.co/RbzWjSL/blank.png');
    const[myCerti2, setMyCerti2] = useState<string>('https://i.ibb.co/RbzWjSL/blank.png');


    const [takenPhoto, setTakenPhoto] = useState<{
        path: string;
        preview: string
    }>();

    const takePhotoHandler = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 80,
            width: 500
        });
        console.log(photo);

        if(!photo || !photo.path || !photo.webPath){
            return;
        }

        setTakenPhoto({
            path: photo.path,
            preview: photo.webPath
        });
    };


    const saveDataHandler = async () => {
        console.log({myDateOfBirth});
        console.log({myFullName});
        console.log({myEmail});
        console.log({myVaccineType});
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
                        <IonButton expand="full" fill="clear" className="changePhotoButton" onClick={takePhotoHandler}>Change Photo</IonButton>
                    </div>
                    <div className="editTitles">
                        <h1>My Details:</h1>
                    </div>
                    <div>
                        <IonItem>
                            <IonInput placeholder="FULL NAME" class="editProfileInput" onIonInput={(e: any) => setMyFullName(e.target.value)} value={myFullName}><IonIcon class="inputIcon" icon={person} slot="start"/></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder="EMAIL" class="editProfileInput" onIonInput={(e: any) => setMyEmail(e.target.value)} value={myEmail}><IonIcon class="inputIcon" icon={mail} slot="start"/></IonInput>
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
                        <IonButton expand="full" fill="clear" className="changePhotoButton" onClick={takePhotoHandler}>Upload Certificate 1</IonButton>
                        <img src={myCerti2}/>
                        <IonButton expand="full" fill="clear" className="changePhotoButton" onClick={takePhotoHandler}>Upload Certificate 2</IonButton>
                    </div>

                    <IonButton expand="full" fill="clear" className="saveButton" onClick={saveDataHandler}>SAVE</IonButton>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default EditProfile;