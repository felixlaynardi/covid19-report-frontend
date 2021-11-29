import {
    IonApp,
    IonContent,
    IonHeader,
    IonIcon, IonLabel,
    IonPage,
    IonRouterOutlet, IonTabBar, IonTabButton,
    IonTabs,
    IonTitle,
    IonToolbar
} from "@ionic/react";
import {barChart, grid, heartOutline, home, homeOutline, pencilOutline, person, search} from "ionicons/icons";
import {Redirect, Route} from "react-router-dom";
import {IonReactRouter} from "@ionic/react-router";
import Tab1 from "./Tab1";
import Tab2 from "./Tab2";
import Tab3 from "./Tab3";
import Profile from "./Profile";

const MainHome: React.FC = () => (
        <IonApp>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route exact path="/tab1">
                            <Tab1 />
                        </Route>
                        <Route exact path="/tab2">
                            <Tab2 />
                        </Route>
                        <Route path="/tab3">
                            <Tab3 />
                        </Route>
                        <Route exact path="/profile">
                            <Profile />
                        </Route>
                        <Route exact path="/">
                            <Redirect to="/tab1" />
                        </Route>
                    </IonRouterOutlet>
                    <IonTabBar slot="top">
                        <IonTabButton tab="tab1" href="/tab1">
                            <IonIcon icon={home} />
                        </IonTabButton>
                        <IonTabButton tab="tab2" href="/tab2">
                            <IonIcon icon={grid} />
                        </IonTabButton>
                        <IonTabButton tab="tab3" href="/tab3">
                            <IonIcon icon={barChart} />
                        </IonTabButton>
                        <IonTabButton tab="profile" href="/profile">
                            <IonIcon icon={person} />
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </IonApp>
    );

export default MainHome;