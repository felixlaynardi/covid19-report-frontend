import './LandingCase.css';
import axios from "axios";
import React from "react";

interface LottiePlayer {
    title: string
    cases: number | string
    increase: number | string
}

const CaseBox: React.FC<LottiePlayer> = (props) => {
    if(props.increase == "date"){
        return (
            <div className="case-box-container">
                <div className="case-box-title">
                    {props.title}
                </div>
                <div className="case-box-cases">
                    {props.cases}
                </div>
            </div>
        )
    }
    return (
      <div className="case-box-container">
        <div className="case-box-title">
            {props.title}
        </div>
        <div className="case-box-cases">
            {props.cases}
        </div>
        <div className="case-box-increase" id={props.title}>
            {props.increase}
            <div className="icon-arrow-up"></div>
        </div>
      </div>
    );
  };

const LandingCase: React.FC = () => {
    const getCasesByDayURL = "https://covid-umn.herokuapp.com/covid/increment?country=Indonesia";

    const [confirmed, setConfirmed] = React.useState(0);
    const [deaths, setDeaths] = React.useState(0);
    const [confirmedIncrease, setConfirmedIncrease] = React.useState(0);
    const [deathsIncrease, setDeathsIncrease] = React.useState(0);

    const [date, setDate] = React.useState(0);

    React.useEffect(() => {
        axios.get(getCasesByDayURL).then((response) => {
            console.log(response)
            setConfirmed(response.data.data.confirmed)
            setDeaths(response.data.data.deaths)
            setConfirmedIncrease(response.data.data.increase_confirmed)
            setDeathsIncrease(response.data.data.increase_deaths)

            let date = response.data.data.date
            setDate(date.slice(0,10))
        });
    }, []);

    return (
        <div className="landing-case-container">
            <CaseBox title={'Confirmed'} cases={confirmed} increase={confirmedIncrease}/>
            <CaseBox title={'Last Updated'} cases={date} increase={"date"}/>
            <CaseBox title={'Death'} cases={deaths} increase={deathsIncrease}/>
        </div>
    )
}

export default LandingCase;
    