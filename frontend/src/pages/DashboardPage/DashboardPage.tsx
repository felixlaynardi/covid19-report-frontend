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

export default function DashboardPage(){
  let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let setFont : string = 'black';

  if (darkMode) {
    setFont = 'white';
  }

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
  
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
            color: setFont
        }
      },
      title: {
        display: true,
        text: 'Daily Cases',
        color: setFont,
        font: {weight: 'bold'}
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
      y: { // defining min and max so hiding the dataset does not change scale range
        min: 0,
        ticks: {
          color: setFont
        }
      },
    }
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  const data = {
    labels,
    datasets: [
      {
        label: 'Confirmed',
        type: 'bar' as const,
        data: [1, 5, 12, 13, 14, 15, 20, 34, 36, 30, 30, 34],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        order: 1
      },
      {
        label: 'Confirmed Increase',
        type: 'line' as const,
        data: [1, 1, 5, 9, 11, 13, 15, 5, 10, 13, 14, 12],
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        order: 2
      },
      {
        label: 'Recovered',
        type: 'bar' as const,
        data: [13, 17, 20, 29, 31, 33, 35, 20, 15, 21, 17, 13],
        borderColor: 'rgb(11, 156, 49)',
        backgroundColor: 'rgba(11, 156, 49, 0.5)',
        order: 3
      },
      {
        label: 'Recovered Increase',
        type: 'line' as const,
        data: [3, 7, 10, 19, 21, 23, 25, 3, 14, 22, 13, 11],
        borderColor: 'rgb(11, 156, 49)',
        backgroundColor: 'rgba(11, 156, 49, 0.5)',
        order: 4
      },
      {
        label: 'Death',
        type: 'bar' as const,
        data: [16, 15, 14, 13, 12, 11, 0, 2, 14, 13, 20, 30],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        order: 5
      },
      {
        label: 'Death Increase',
        type: 'line' as const,
        data: [6, 5, 4, 3, 2, 1, 0, 2, 12, 1, 6, 10],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        order: 6
      },
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
          <Chart type='line' options={options} data={data} />
        </div>
      </div>
    </IonContent>
  )
}