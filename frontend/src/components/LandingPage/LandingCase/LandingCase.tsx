import './LandingCase.css';

interface LottiePlayer {
    title: string
    cases: number
    increase: number
}

const CaseBox: React.FC<LottiePlayer> = (props) => {
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
    return (
        <div className="landing-case-container">
            <CaseBox title={'Confirmed'} cases={1000} increase={100}/>
            <CaseBox title={'Recovered'} cases={1000} increase={100}/>
            <CaseBox title={'Death'} cases={1000} increase={100}/>
        </div>
    )
}

export default LandingCase;
    