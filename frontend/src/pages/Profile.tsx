import {
    IonButton,
    IonCard,
    IonContent,
    IonHeader, IonLabel,
    IonPage,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import ProfilePage from "../components/ProfilePage";
import './Profile.css';

const Profile: React.FC = () => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonCard>
                    <div className="profileContainer">
                        <img src="https://i.ibb.co/WHrxLMF/profilepic.png"/>
                        <h1>John Doe</h1>
                        <h2>Jakarta, Indonesia</h2>
                        <IonButton expand="full" fill="clear" className="editProfileButton" routerLink='/profile/edit'>Edit Profile</IonButton>
                    </div>
                    <div className="titles">
                        <h1>Status:</h1>
                    </div>
                    <div className="statusContainer">
                        <IonSegment>
                            <IonSegmentButton className="healthStatus">
                                <IonLabel>Healthy</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                        <p>Last checked: 4 hours ago</p>
                        <IonSegment>
                            <IonSegmentButton className="vaccineStatus">
                                <IonLabel>Fully Vaccinated: Sinovac</IonLabel>
                            </IonSegmentButton>
                        </IonSegment>
                    </div>
                    <div className="titles">
                        <h1>Certificates:</h1>
                    </div>
                    <div className="certificatesContainer">
                        <IonSegment scrollable class="scrollableCertificates">
                            <img src="https://i.ibb.co/XZYNHdt/serti.jpg"/>
                            <img src="https://i.ibb.co/XZYNHdt/serti.jpg"/>
                        </IonSegment>
                    </div>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Profile;