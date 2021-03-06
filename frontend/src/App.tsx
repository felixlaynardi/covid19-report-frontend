import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import LandingPage from './pages/LandingPage/LandingPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import DataPage from './pages/DataPage/DataPage';
import ProfileBefore from './pages/ProfilePage/ProfileBefore';

import { Switch } from 'react-router-dom';
import { ToastProvider, useToast } from "@agney/ir-toast";
import './index.css'
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfile from "./pages/EditProfilePage/EditProfile";
import UserContextProvider from "./data/UserContextProvider";
const App: React.FC = () => (
  <IonApp>
    <ToastProvider value={{ duration: 1500 }}>
    <IonReactRouter>
      <UserContextProvider>
        <IonRouterOutlet id="main">
          <Switch>
            <Route path="/home" component={LandingPage}/>
            <Route path="/dashboard" component={DashboardPage}/>
            <Route path="/data" component={DataPage}/>
            <Route path="/login" component={ProfileBefore}/>
            <Route path="/profile" component={ProfilePage}/>
            <Route path="/editProfile" component={EditProfile}/>
            <Route path="/myprofile" component={ProfilePage}/>
            <Redirect exact from="/" to="/home"/>
          </Switch>
        </IonRouterOutlet>
      </UserContextProvider>   
    </IonReactRouter>
    </ToastProvider>
  </IonApp>
);

export default App;
