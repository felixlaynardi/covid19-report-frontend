import Navbar from '../../components/Navbar/Navbar';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

import './DashboardPage.css';
import { IonContent } from '@ionic/react';
import axios from "axios";
import React from "react";

const DashboardPage : React.FC = () => {
  const getCasesByDayURL = "http://localhost:4747/covid/days?country=Indonesia";

  let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let setFont : string = 'black';

  if (darkMode) {
    setFont = 'white';
  }

  const [labels, setLabels] = React.useState([] as any);
  const [confirmed, setConfirmed] = React.useState([] as any);
  const [deaths, setDeaths] = React.useState([] as any);
  const [confirmedIncrease, setConfirmedIncrease] = React.useState([] as any);
  const [deathsIncrease, setDeathsIncrease] = React.useState([] as any);

  const [confirmedMin, setConfirmedMin] = React.useState(0);
  const [deathsMin, setDeathsMin] = React.useState(0);

  React.useEffect(() => {
    axios.get(getCasesByDayURL).then((response) => {
      setConfirmedMin(response.data.data[0].confirmed - (response.data.data[response.data.data.length - 1].confirmed - response.data.data[0].confirmed))
      setDeathsMin(response.data.data[0].deaths - (response.data.data[response.data.data.length - 1].deaths - response.data.data[0].deaths))
      for(let i=0; i < response.data.data.length;i++){
        setLabels((oldArray : any) => [...oldArray, response.data.data[i].date_label])
        setConfirmed((oldArray : any) => [...oldArray, response.data.data[i].confirmed])
        setDeaths((oldArray : any) => [...oldArray, response.data.data[i].deaths])
        setConfirmedIncrease((oldArray : any) => [...oldArray, response.data.data[i].increase_confirmed])
        setDeathsIncrease((oldArray : any) => [...oldArray, response.data.data[i].increase_deaths])
      }
    });
  }, []);

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
  const optionsLine = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
            color: setFont
        }
      },
    },
    ticks: {
      backdropColor: 'rgb(255, 99, 132)'
    },
    scales: {
      x: { // defining min and max so hiding the dataset does not change scale range
        ticks: {
          color: setFont
        }
      },
      y1: { // defining min and max so hiding the dataset does not change scale range
        min: 0,
        ticks: {
          color: 'rgb(53, 162, 235)'
        }
      },
      y2: { // defining min and max so hiding the dataset does not change scale range
        min: 0,
        ticks: {
          color: 'rgb(255, 99, 132)'
        }
      },
    }
  };

  const optionsBar = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
            color: setFont
        }
      },
    },
    ticks: {
      backdropColor: 'rgb(255, 99, 132)'
    },
    scales: {
      x: { // defining min and max so hiding the dataset does not change scale range
        ticks: {
          color: setFont
        }
      },
      y1: { // defining min and max so hiding the dataset does not change scale range
        min: confirmedMin,
        ticks: {
          color: 'rgb(53, 162, 235)'
        }
      },
      y2: { // defining min and max so hiding the dataset does not change scale range
        min: deathsMin,
        ticks: {
          color: 'rgb(255, 99, 132)'
        },
      },
    }
  };
  
  const dataBar = {
    labels,
    datasets: [
      {
        label: 'Confirmed',
        type: 'bar' as const,
        data: confirmed,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        order: 1,
        yAxisID: 'y1',
      },
      {
        label: 'Death',
        type: 'bar' as const,
        data: deaths,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        order: 2,
        yAxisID: 'y2',
      }
    ],
  };

  const dataLine = {
    labels,
    datasets: [
      {
        label: 'Confirmed Increase',
        type: 'line' as const,
        data: confirmedIncrease,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        order: 1,
        yAxisID: 'y1',
      },
      {
        label: 'Death Increase',
        type: 'line' as const,
        data: deathsIncrease,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        order: 2,
        yAxisID: 'y2',
      }
    ],
  };

  return(
    <IonContent>
      <Navbar/>
      <div className="dashboard-box-container">
        <div className="dashboard-box-inner">
          <div className="dashboard-title">
            Daily Data
          </div>
        </div>
        <div className="dashboard-chart-container">
          <Chart type='line' options={optionsBar} data={dataBar} className="dashboard-chart"/>
          <Chart type='line' options={optionsLine} data={dataLine} className="dashboard-chart"/>
        </div>
      </div>
    </IonContent>
  )
}

export default DashboardPage;