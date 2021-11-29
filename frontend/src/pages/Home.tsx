import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
// import './Home.css';
import HomeBeforeLogin from "../components/HomeBeforeLogin";

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Blank</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/*<ExploreContainer />*/}
        <HomeBeforeLogin/>
      </IonContent>
    </IonPage>
  );
};

export default Home;
