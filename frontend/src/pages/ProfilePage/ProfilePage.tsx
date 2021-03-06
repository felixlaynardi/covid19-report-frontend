import {
    IonButton,
    IonCard, IonCol,
    IonContent, IonGrid,
    IonHeader, IonIcon, IonLabel,
    IonPage, IonRow,
    IonSegment,
    IonSegmentButton,
    IonTitle,
    IonToolbar
} from "@ionic/react";

import './ProfilePage.css';
import {refreshCircleOutline} from "ionicons/icons";
import {useContext, useEffect, useState} from "react";
import { Geolocation } from '@capacitor/geolocation';
import Navbar from '../../components/Navbar/Navbar';
import UserContext from "../../data/user-context";
import { useHistory } from "react-router";
import { useToast } from "@agney/ir-toast";
import axios from "axios";

const Profile: React.FC = () => {
    const userContext = useContext(UserContext);
    var getUserUrl = "https://covid-umn.herokuapp.com/user";
    const history = useHistory();
    // const [lat, setLat] = useState<number>(0);
    // const [lng, setLng] = useState<number>(0);
    let lat: string | number, lng: string | number;
    const Toast = useToast();

    const [myLocation, setMyLocation] = useState<string>('Location Untracked');

    //useState of Profile Details
    const[myFullName, setMyFullName] = useState<string>('John Doe');
    const[myProfilePicture, setMyProfilePicture] = useState<string>('https://i.ibb.co/WHrxLMF/profilepic.png');
    const[myVaccineStatus, setMyVaccineStatus] = useState<string>('Vaccine Undocumented');
    const[myVaccineType, setMyVaccineType] = useState<string>('');
    const[myHealthStatus, setMyHealthStatus] = useState<string>('Unknown Health Status');
    const[myLastHealthCheck, setMyLastHealthCheck] = useState<number>(0);

    const[myCerti1, setMyCerti1] = useState<string>('https://i.ibb.co/RbzWjSL/blank.png');
    const[myCerti2, setMyCerti2] = useState<string>('https://i.ibb.co/RbzWjSL/blank.png');

    // let city: string, country: string;

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
                        setMyVaccineStatus("Vaccined")
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
                }).catch((error) => {
                    userContext.setToken("", "");
                    Toast.error("Session expired");
                    history.push('/login');
                });
            } else {
                history.push('/login');
            }
        }
        checkTokenExistOrNot();
    }, [])

    const trackPosition = async() => {
        const data = await Geolocation.watchPosition({
            enableHighAccuracy:true,
            // timeout: 1000
        }, (position, err) => {
            if(position){
                // console.log(position);
                // console.log('Current position:', data);
                // console.log('Lat: ', position.coords.latitude);
                // console.log('Lng: ', position.coords.longitude);

                // setLat(position.coords.latitude);
                // setLng(position.coords.longitude);
                lat = position.coords.latitude;
                lng = position.coords.longitude;

                const request = new XMLHttpRequest();
                const APIkey = "AIzaSyDoTnsC9L0Fb1Ve0Tlnjx4WAXQ-herCSyw";

                const method = 'GET';
                const url = 'https://us1.locationiq.com/v1/reverse.php?key=pk.fbde5221804a339af1ee1c4d3db3b304&lat='+lat+'&lon='+lng+'&format=json';
                const async = true;

                console.log(url);

                request.open(method, url, async);
                request.onreadystatechange = function() {
                    if (request.readyState == 4 && request.status == 200) {
                        const response = JSON.parse(request.responseText);
                        let city = response.address.state;
                        const country = response.address.country;

                        console.log(city+', '+country);
                        setMyLocation(city+', '+country);
                    }
                };
                request.send();
            }
        });

    };

    const logoutHandler = async() => {
        userContext.setToken("", "");
        Toast.success("Logout success");
        history.push('/login');
    }

    return (
        <IonPage>
            <IonContent fullscreen>
                <Navbar/>
                <IonCard>
                    <div className="profileContainer">
                        <img src={myProfilePicture}/>
                        <h1>{myFullName}</h1>
                        <IonGrid>
                            <IonRow>
                                <IonCol className="locationText">
                                    <h2>{myLocation}</h2>
                                </IonCol>
                                <IonCol size="3">
                                    <IonButton expand="full" fill="clear" onClick={trackPosition}><IonIcon icon={refreshCircleOutline}/></IonButton>
                                </IonCol>
                            </IonRow>
                        </IonGrid>
                        <IonButton expand="full" fill="clear" className="editProfileButton" routerLink='/editprofile'>Edit Profile</IonButton>
                    </div>
                    <div className="titles">
                        <h1>Status:</h1>
                    </div>
                    <div className="statusContainer">
                        <IonButton expand="full" fill="clear" className="healthStatus">
                            {myHealthStatus}
                        </IonButton>
                        <p>Last checked: {myLastHealthCheck} hours ago</p>
                        <IonButton expand="full" fill="clear" className="vaccineStatus">
                            {myVaccineStatus}: {myVaccineType}
                        </IonButton>
                    </div>
                    <div className="titles">
                        <h1>Certificates:</h1>
                    </div>
                    <div className="certificatesContainer">
                        <IonSegment scrollable class="scrollableCertificates">
                            <img src={myCerti1}/>
                            <img src={myCerti2}/>
                        </IonSegment>
                    </div>
                    <div className="logoutContainer">
                        <IonButton expand="full" fill="clear" className="editProfileButton" onClick={logoutHandler}>Log Out</IonButton>
                    </div>
                </IonCard>
            </IonContent>
        </IonPage>
    );
};

export default Profile;