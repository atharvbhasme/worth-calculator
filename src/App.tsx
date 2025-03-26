import React from 'react'
import './App.css'
import InputBox from './components/Input-Box'
import SubmitButton from './components/Submit-Button'
import { diffYear, inputValueData } from './types'
import { calculateYearDifference, findInterest, findPastValue } from './functions/helper'
import AdjustableTable from './components/AdjustableTable'

function App() {
  const [amount, setAmount] = React.useState<string>('0');
  const [year, setYear] = React.useState<string>(new Date().toISOString().split('T')[0]); // Change type to string
  const [inflation, setInflation] = React.useState<string>('7');
  const [ans, setAns] = React.useState<string>(''); // Use lowercase string

  const yearNumber = new Date(year).getFullYear();

  const inputData: inputValueData[] = [
    {
      id: '1',
      inputHeaderText: 'Enter the amount',
      inputType: 'number',
      defaultValue: '0', // Ensure defaultValue is a string
      placeholder: 'Enter the amount',
      name: 'amount'
    },
    {
      id: '2',
      inputHeaderText: 'Enter the Year You want to find Worth',
      inputType: "date",
      defaultValue: new Date().toISOString().split('T')[0],
      name: 'date'
    },
    {
      id: '3',
      inputHeaderText: 'Average Inflation Rate',
      inputType: 'number',
      defaultValue: '7',
      placeholder: '7',
      name: 'interest'
    },
  ]

  const findAns = (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page refresh

    const noOfYears: diffYear = calculateYearDifference(year);
    if (noOfYears.isFuture) {
      const finalAmount = findInterest(amount, inflation, year);
      setAns(finalAmount.toString());
    } else {
      const finalAmount = findPastValue(amount, inflation, year);
      setAns(finalAmount.toString());
    }
  }

  return (
    <div>
      <h1 className="text-2xl/7 font-bold text-white-900 sm:truncate sm:text-3xl sm:tracking-tight">
        🔢 Worth Calculator
      </h1>
      <div>
        <form className="main-input-box" onSubmit={findAns}>
          <InputBox 
            headerText={inputData[0].inputHeaderText} 
            inputType={inputData[0].inputType} 
            name={inputData[0].name} 
            placeholder={inputData[0].placeholder} 
            setState={setAmount} 
          />
          <InputBox 
            headerText={inputData[1].inputHeaderText} 
            inputType={inputData[1].inputType} 
            name={inputData[1].name} 
            placeholder={inputData[1].defaultValue} 
            setState={setYear} 
          />
          <InputBox 
            headerText={inputData[2].inputHeaderText} 
            inputType={inputData[2].inputType} 
            name={inputData[2].name} 
            placeholder={inputData[2].placeholder} 
            setState={setInflation} 
          />
          <SubmitButton buttonText="Submit" buttonType="submit" onClick={() => {}} />
        </form>
        <h3 className="text-2xl/7 font-bold text-white-700 sm:truncate sm:text-2xl sm:tracking-tight m-2.5">
          How much it will be worth in the selected year
        </h3>
        <h3 className="text-2xl/7 text-white-500 sm:truncate sm:text-1xl sm:tracking-tight">
          {ans}
        </h3>

        <AdjustableTable yearNumber={yearNumber} amount={amount}/>
      </div>
    </div>
  );
}

export default App;
