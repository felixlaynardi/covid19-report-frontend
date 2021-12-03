import {
    IonButtons,
    IonCard,
    IonContent,
    IonHeader,
    IonPage,
    IonToolbar,
    IonBackButton,
    IonLabel, IonButton, IonInput, IonItem, IonIcon
} from "@ionic/react";
import './EditProfile.css';
import {calendar, fitness, mail, person} from "ionicons/icons";
import {useState} from "react";
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
// import {Directory, Filesystem} from "@capacitor/filesystem";


const EditProfile: React.FC = () => {

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

    return (
        <IonPage>
            <IonHeader class="ion-no-border">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/profile"/>
                        <IonLabel class="backText">Back</IonLabel>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonCard>
                    <div className="editProfileContainer">
                        <img src="https://i.ibb.co/WHrxLMF/profilepic.png"/>
                        <IonButton expand="full" fill="clear" className="changePhotoButton" onClick={takePhotoHandler}>Change Photo</IonButton>
                    </div>
                    <div className="editTitles">
                        <h1>My Details:</h1>
                    </div>
                    <div>
                        <IonItem>
                            <IonInput placeholder="FULL NAME" class="editNameInput"><IonIcon class="nameInputIcon" icon={person} slot="start"/></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder="EMAIL" class="emailInput"><IonIcon class="emailInputIcon" icon={mail} slot="start"/></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder="DATE OF BIRTH" class="nameInput" type="date"><IonIcon class="emailInputIcon" icon={calendar} slot="start"/></IonInput>
                        </IonItem>
                        <IonItem>
                            <IonInput placeholder="VACCINE TYPE" class="nameInput"><IonIcon class="emailInputIcon" icon={fitness} slot="start"/></IonInput>
                        </IonItem>
                    </div>
                    <div className="certificateTitle">
                        <h1>Certificates:</h1>
                    </div>
                    <div className="certificates">
                        <img src="https://i.ibb.co/XZYNHdt/serti.jpg"/>
                        <IonButton expand="full" fill="clear" className="changePhotoButton" onClick={takePhotoHandler}>Upload Certificate 1</IonButton>
                        <img src="https://i.ibb.co/XZYNHdt/serti.jpg"/>
                        <IonButton expand="full" fill="clear" className="changePhotoButton" onClick={takePhotoHandler}>Upload Certificate 2</IonButton>
                    </div>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default EditProfile;