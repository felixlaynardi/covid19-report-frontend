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

import './DataPage.css';
import { IonButton, IonContent, IonItem, IonLabel, IonSelect, IonSelectOption, IonAlert } from '@ionic/react';
import axios from "axios";
import React from "react";

const DataPage : React.FC = () => {
  //get cases URL
  var daysUrl = "https://covid-umn.herokuapp.com/covid/days?";
  var monthsUrl = "https://covid-umn.herokuapp.com/covid/months?";

  let darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

  let setFont : string = 'black';

  if (darkMode) {
    setFont = 'white';
  }

  //Graph data
  const [showGraph, setShowGraph] = React.useState(false);

  const [labels, setLabels] = React.useState([] as any);
  const [confirmed, setConfirmed] = React.useState([] as any);
  const [deaths, setDeaths] = React.useState([] as any);
  const [confirmedIncrease, setConfirmedIncrease] = React.useState([] as any);
  const [deathsIncrease, setDeathsIncrease] = React.useState([] as any);

  const [confirmedMin, setConfirmedMin] = React.useState(0);
  const [deathsMin, setDeathsMin] = React.useState(0);

  //Showing alert
  const [showAlertFill, setShowAlertFill] = React.useState(false);
  const [showAlertInvalid, setShowAlertInvalid] = React.useState(false);
  const [showAlertNotFound, setShowAlertNotFound] = React.useState(false);

  //Form data
  const [types, setTypes] = React.useState(0);
  const [country, setCountry] = React.useState("");
  const [year, setYear] = React.useState(0);

  //For daily data
  const [month, setMonth] = React.useState(0);
  const [fromDate, setFromDate] = React.useState(0);
  const [toDate, setToDate] = React.useState(0);

  //For monthly data
  const [fromMonth, setFromMonth] = React.useState(0);
  const [toMonth, setToMonth] = React.useState(0);

  const submitForm = () => {

    console.log("checked")

    console.log(types)
    console.log(country)
    console.log(year)

    if(types == 1){
      console.log("weekly")
      console.log(month)
      console.log(fromDate)
      console.log(toDate)
    }
    else if(types == 2){
      console.log("monthly")
      console.log(fromMonth)
      console.log(toMonth)
    }


    //alert on not filled
    if(types == 0 || country == "" || year == 0){
      setShowAlertFill(true)
      return
    }
    else if(types == 1){
      if(month == 0 || fromDate == 0 || toDate == 0){
        setShowAlertFill(true)
        return
      }
    }
    else{
      if(fromMonth == 0 || toMonth == 0){
        setShowAlertFill(true)
        return
      }
    }
    
    //alert on invalid data
    if(types == 1){
      //date validation
      if(month == 2 && year != 2020 && (fromDate > 28 || toDate > 28)){
        setShowAlertInvalid(true)
        return
      }
      if(month == 2 && year == 2020 && (fromDate > 29 || toDate > 29)){
        setShowAlertInvalid(true)
        return
      }
      if((month == 4 || month == 6 || month == 9 || month == 11) && year == 2020 && (fromDate > 30 || toDate > 30)){
        setShowAlertInvalid(true)
        return
      }

      //date range validation
      if(toDate - fromDate < 0){
        setShowAlertInvalid(true)
        return
      }
    }
    else if(types == 2){
      //month range validation
      if(toMonth - fromMonth < 0){
        setShowAlertInvalid(true)
        return
      }
    }

    var url : URL
    var params : URLSearchParams

    if(types == 1){
      url = new URL(daysUrl)
      params = new URLSearchParams(url.search);
      params.append('year', year.toString());
      params.append('month', month.toString());
      params.append('start_date', fromDate.toString());
      params.append('date_range', (toDate - fromDate).toString());
    }
    else{
      url = new URL(monthsUrl)
      params = new URLSearchParams(url.search);
      params.append('year', year.toString());
      params.append('start_month', fromMonth.toString());
      params.append('month_range', (toMonth - fromMonth).toString());
    }

    params.append('country', country);

    let endpoint = url.toString() + params.toString()

    console.log(endpoint)

    axios.get(endpoint).then((response) => {
      if(response.data.data != null){

        setLabels([])
        setConfirmed([])
        setDeaths([])
        setConfirmedIncrease([])
        setDeathsIncrease([])

        if(response.data.data.length > 1){
          if(response.data.data[0].confirmed - (response.data.data[response.data.data.length - 1].confirmed - response.data.data[0].confirmed) >= 1000){
            setConfirmedMin(response.data.data[0].confirmed - (response.data.data[response.data.data.length - 1].confirmed - response.data.data[0].confirmed))
          }
          else{
            setConfirmedMin(0)
          }
          if(response.data.data[0].confirmed - (response.data.data[response.data.data.length - 1].confirmed - response.data.data[0].confirmed) >= 1000){
            setDeathsMin(response.data.data[0].deaths - (response.data.data[response.data.data.length - 1].deaths - response.data.data[0].deaths))
          }
          else{
            setDeathsMin(0)
          }
        }
        for(let i=0; i < response.data.data.length;i++){
          setLabels((oldArray : any) => [...oldArray, response.data.data[i].date_label])
          setConfirmed((oldArray : any) => [...oldArray, response.data.data[i].confirmed])
          setDeaths((oldArray : any) => [...oldArray, response.data.data[i].deaths])
          setConfirmedIncrease((oldArray : any) => [...oldArray, response.data.data[i].increase_confirmed])
          setDeathsIncrease((oldArray : any) => [...oldArray, response.data.data[i].increase_deaths])
        }

        setShowGraph(true)
      }
      else{
        setShowAlertNotFound(true)
        setShowGraph(false)
        return
      }
    });
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
      <IonAlert
        isOpen={showAlertFill}
        onDidDismiss={() => setShowAlertFill(false)}
        header={'Please fill all the data in the form'}
        buttons={[
          {
            text: 'Ok'
          }
        ]}
      />
      <IonAlert
        isOpen={showAlertInvalid}
        onDidDismiss={() => setShowAlertInvalid(false)}
        header={'Please fill the data in the form correctly'}
        buttons={[
          {
            text: 'Ok'
          }
        ]}
      />
      <IonAlert
        isOpen={showAlertNotFound}
        onDidDismiss={() => setShowAlertNotFound(false)}
        header={'Data from selected time range are not found'}
        buttons={[
          {
            text: 'Ok'
          }
        ]}
      />
      <Navbar/>
      <div className="data-box-container">
        <div className="data-box-inner">
          <div className="data-title">
            Data History
          </div>
          <IonItem className="data-box-form-control">
            <IonLabel>Daily / Monthly</IonLabel>
            <IonSelect onIonChange={e => setTypes(e.detail.value)}>
              <IonSelectOption value="1">Daily</IonSelectOption>
              <IonSelectOption value="2">Month</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem className="data-box-form-control">
            <IonLabel>Country</IonLabel>
            <IonSelect onIonChange={e => setCountry(e.detail.value)}>
              <IonSelectOption value="Indonesia">Indonesia</IonSelectOption>
              <IonSelectOption value="Malaysia">Malaysia</IonSelectOption>
              <IonSelectOption value="Singapore">Singapore</IonSelectOption>
              <IonSelectOption value="Japan">Japan</IonSelectOption>
              <IonSelectOption value="Korea-South">South Korea</IonSelectOption>
              <IonSelectOption value="Thailand">Thailand</IonSelectOption>
              <IonSelectOption value="India">India</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem className="data-select-year data-box-form-control">
            <IonLabel>Select year</IonLabel>
            <IonSelect onIonChange={e => setYear(e.detail.value)}>
              <IonSelectOption value="2020">2020</IonSelectOption>
              <IonSelectOption value="2021">2021</IonSelectOption>
            </IonSelect>
          </IonItem>

          {types == 2 && (
            <>
            <IonItem className="data-select-month data-box-form-control">
              <IonLabel>From month</IonLabel>
              <IonSelect onIonChange={e => setFromMonth(e.detail.value)}>
                <IonSelectOption value="1">January</IonSelectOption>
                <IonSelectOption value="2">February</IonSelectOption>
                <IonSelectOption value="3">March</IonSelectOption>
                <IonSelectOption value="4">April</IonSelectOption>
                <IonSelectOption value="5">May</IonSelectOption>
                <IonSelectOption value="6">June</IonSelectOption>
                <IonSelectOption value="7">July</IonSelectOption>
                <IonSelectOption value="8">August</IonSelectOption>
                <IonSelectOption value="9">September</IonSelectOption>
                <IonSelectOption value="10">October</IonSelectOption>
                <IonSelectOption value="11">November</IonSelectOption>
                <IonSelectOption value="12">December</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem className="data-select-month data-box-form-control">
              <IonLabel>To month</IonLabel>
              <IonSelect onIonChange={e => setToMonth(e.detail.value)}>
                <IonSelectOption value="1">January</IonSelectOption>
                <IonSelectOption value="2">February</IonSelectOption>
                <IonSelectOption value="3">March</IonSelectOption>
                <IonSelectOption value="4">April</IonSelectOption>
                <IonSelectOption value="5">May</IonSelectOption>
                <IonSelectOption value="6">June</IonSelectOption>
                <IonSelectOption value="7">July</IonSelectOption>
                <IonSelectOption value="8">August</IonSelectOption>
                <IonSelectOption value="9">September</IonSelectOption>
                <IonSelectOption value="10">October</IonSelectOption>
                <IonSelectOption value="11">November</IonSelectOption>
                <IonSelectOption value="12">December</IonSelectOption>
              </IonSelect>
            </IonItem>
            </>
          )}

          {types == 1 && (
            <>
            <IonItem className="data-select-date data-box-form-control">
              <IonLabel>Select month</IonLabel>
              <IonSelect onIonChange={e => setMonth(e.detail.value)}>
                <IonSelectOption value="1">January</IonSelectOption>
                <IonSelectOption value="2">February</IonSelectOption>
                <IonSelectOption value="3">March</IonSelectOption>
                <IonSelectOption value="4">April</IonSelectOption>
                <IonSelectOption value="5">May</IonSelectOption>
                <IonSelectOption value="6">June</IonSelectOption>
                <IonSelectOption value="7">July</IonSelectOption>
                <IonSelectOption value="8">August</IonSelectOption>
                <IonSelectOption value="9">September</IonSelectOption>
                <IonSelectOption value="10">October</IonSelectOption>
                <IonSelectOption value="11">November</IonSelectOption>
                <IonSelectOption value="12">December</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem className="data-select-date data-box-form-control">
              <IonLabel>From date</IonLabel>
              <IonSelect onIonChange={e => setFromDate(e.detail.value)}>
                <IonSelectOption value="1">1</IonSelectOption>
                <IonSelectOption value="2">2</IonSelectOption>
                <IonSelectOption value="3">3</IonSelectOption>
                <IonSelectOption value="4">4</IonSelectOption>
                <IonSelectOption value="5">5</IonSelectOption>
                <IonSelectOption value="6">6</IonSelectOption>
                <IonSelectOption value="7">7</IonSelectOption>
                <IonSelectOption value="8">8</IonSelectOption>
                <IonSelectOption value="9">9</IonSelectOption>
                <IonSelectOption value="10">10</IonSelectOption>
                <IonSelectOption value="11">11</IonSelectOption>
                <IonSelectOption value="12">12</IonSelectOption>
                <IonSelectOption value="13">13</IonSelectOption>
                <IonSelectOption value="14">14</IonSelectOption>
                <IonSelectOption value="15">15</IonSelectOption>
                <IonSelectOption value="16">16</IonSelectOption>
                <IonSelectOption value="17">17</IonSelectOption>
                <IonSelectOption value="18">18</IonSelectOption>
                <IonSelectOption value="19">19</IonSelectOption>
                <IonSelectOption value="20">20</IonSelectOption>
                <IonSelectOption value="21">21</IonSelectOption>
                <IonSelectOption value="22">22</IonSelectOption>
                <IonSelectOption value="23">23</IonSelectOption>
                <IonSelectOption value="24">24</IonSelectOption>
                <IonSelectOption value="25">25</IonSelectOption>
                <IonSelectOption value="26">26</IonSelectOption>
                <IonSelectOption value="27">27</IonSelectOption>
                <IonSelectOption value="28">28</IonSelectOption>
                <IonSelectOption value="29">29</IonSelectOption>
                <IonSelectOption value="30">30</IonSelectOption>
                <IonSelectOption value="31">31</IonSelectOption>
              </IonSelect>
            </IonItem>
            <IonItem className="data-select-date data-box-form-control">
              <IonLabel>To date</IonLabel>
              <IonSelect onIonChange={e => setToDate(e.detail.value)}>
                <IonSelectOption value="1">1</IonSelectOption>
                <IonSelectOption value="2">2</IonSelectOption>
                <IonSelectOption value="3">3</IonSelectOption>
                <IonSelectOption value="4">4</IonSelectOption>
                <IonSelectOption value="5">5</IonSelectOption>
                <IonSelectOption value="6">6</IonSelectOption>
                <IonSelectOption value="7">7</IonSelectOption>
                <IonSelectOption value="8">8</IonSelectOption>
                <IonSelectOption value="9">9</IonSelectOption>
                <IonSelectOption value="10">10</IonSelectOption>
                <IonSelectOption value="11">11</IonSelectOption>
                <IonSelectOption value="12">12</IonSelectOption>
                <IonSelectOption value="13">13</IonSelectOption>
                <IonSelectOption value="14">14</IonSelectOption>
                <IonSelectOption value="15">15</IonSelectOption>
                <IonSelectOption value="16">16</IonSelectOption>
                <IonSelectOption value="17">17</IonSelectOption>
                <IonSelectOption value="18">18</IonSelectOption>
                <IonSelectOption value="19">19</IonSelectOption>
                <IonSelectOption value="20">20</IonSelectOption>
                <IonSelectOption value="21">21</IonSelectOption>
                <IonSelectOption value="22">22</IonSelectOption>
                <IonSelectOption value="23">23</IonSelectOption>
                <IonSelectOption value="24">24</IonSelectOption>
                <IonSelectOption value="25">25</IonSelectOption>
                <IonSelectOption value="26">26</IonSelectOption>
                <IonSelectOption value="27">27</IonSelectOption>
                <IonSelectOption value="28">28</IonSelectOption>
                <IonSelectOption value="29">29</IonSelectOption>
                <IonSelectOption value="30">30</IonSelectOption>
                <IonSelectOption value="31">31</IonSelectOption>
              </IonSelect>
            </IonItem>
            </>
          )}
          {types != 0 && (
            <IonButton expand="block" color="light" className="data-submit-btn" onClick={submitForm}>Submit</IonButton>
          )}
        </div>
        <div className="data-chart-container">
          {showGraph && (
            <>
              <Chart type='line' options={optionsBar} data={dataBar} className="data-chart"/>
              <Chart type='line' options={optionsLine} data={dataLine} className="data-chart"/>
            </>
          )}
        </div>
      </div>
    </IonContent>
  )
}

export default DataPage;