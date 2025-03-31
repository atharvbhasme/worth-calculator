import React from "react";
import "./App.css";
import InputBox from "./components/Input-Box";
import SubmitButton from "./components/Submit-Button";
import { diffYear, inputValueData } from "./types";
import {
  calculateYearDifference,
  findInterest,
  findPastValue,
} from "./functions/helper";
import AdjustableTable from "./components/AdjustableTable";

function App() {
  const [amount, setAmount] = React.useState("1000");
  const [year, setYear] = React.useState(new Date().toISOString().split("T")[0]);
  const [inflation, setInflation] = React.useState("7");
  const [ans, setAns] = React.useState("");
  const [baseYear, setBaseYear] = React.useState(new Date().getFullYear());

  const inputData: inputValueData[] = [
    {
      id: "1",
      inputHeaderText: "Enter the amount",
      inputType: "number",
      defaultValue: "1000",
      placeholder: "Enter amount",
      name: "amount",
    },
    {
      id: "2",
      inputHeaderText: "Target Year",
      inputType: "date",
      defaultValue: new Date().toISOString().split("T")[0],
      name: "date",
    },
    {
      id: "3",
      inputHeaderText: "Rate (%)",
      inputType: "number",
      defaultValue: "7",
      placeholder: "Enter rate",
      name: "interest",
    },
  ];

  const findAns = (event: React.FormEvent) => {
    event.preventDefault();
    const noOfYears = calculateYearDifference(year);
    const finalAmount = noOfYears.isFuture
      ? findInterest(amount, inflation, year)
      : findPastValue(amount, inflation, year);
    setAns(finalAmount.toString());
  };

  React.useEffect(() => {
    setBaseYear(new Date(year).getFullYear());
  }, [year]);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">₹ Worth Calculator</h1>
      
      <form onSubmit={findAns} className="grid gap-4 mb-8 md:grid-cols-3">
        {inputData.map((input) => (
          <InputBox
            key={input.id}
            headerText={input.inputHeaderText}
            inputType={input.inputType}
            name={input.name}
            placeholder={input.placeholder}
            setState={input.name === 'amount' ? setAmount : 
                     input.name === 'date' ? setYear : 
                     setInflation}
          />
        ))}
        <div className="md:col-span-3">
          <SubmitButton buttonText="Calculate" />
        </div>
      </form>

      {ans && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">
            {calculateYearDifference(year).isFuture ? 'Future' : 'Past'} Value
          </h2>
          <p className="text-2xl font-mono">₹{Number(ans).toFixed(2)}</p>
        </div>
      )}

      <div className="space-y-10">
        <div>
          <h2 className="text-xl font-semibold mb-3">Future Value Projection</h2>
          <AdjustableTable
            baseYear={baseYear}
            amount={amount}
            rows={10}
            cols={10}
            isFutureTable={true}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-3">Past Value Calculation</h2>
          <AdjustableTable
            baseYear={baseYear}
            amount={amount}
            rows={10}
            cols={10}
            isFutureTable={false}
          />
        </div>
      </div>
    </div>
  );
}

export default App;