import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
// import './Home.css';
import ProfileBeforeContainer from "../../components/ProfilePage/ProfileBeforeContainer";

const ProfileBefore: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <ProfileBeforeContainer/>
      </IonContent>
    </IonPage>
  );
};

export default ProfileBefore;
