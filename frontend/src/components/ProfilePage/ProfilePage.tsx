import {IonApp, IonCard, IonContent, IonPage} from "@ionic/react";
import Navbar from "../Navbar/Navbar";

interface ContainerProps { }

const ProfilePage: React.FC<ContainerProps> = () => {
    return (
        <IonPage>
            <IonContent>
                <Navbar/>
                <IonCard>
                    <div className="container">
                        <strong>Profile Page</strong>
                        <p>Start with Ionic <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
                    </div>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default ProfilePage;
