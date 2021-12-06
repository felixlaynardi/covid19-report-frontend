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

import './index.css'
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import EditProfile from "./pages/EditProfilePage/EditProfile";

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet id="main">
        <Switch>
          <Route path="/home" component={LandingPage}/>
          <Route path="/dashboard" component={DashboardPage}/>
          <Route path="/data" component={DataPage}/>
          {/*<Route path="/profile" component={ProfileBefore}/>*/}
          <Route path="/profile" component={ProfilePage}/>
          <Route path="/editProfile" component={EditProfile}/>
          <Route path="/myprofile" component={ProfilePage}/>
          <Redirect exact from="/" to="/home"/>
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
