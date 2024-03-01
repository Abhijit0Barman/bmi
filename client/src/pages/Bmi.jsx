import { useState } from "react";
import axios from "axios";

export const Bmi = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState();
  let result = "";

  const handleSubmit = (e) => {
    e.preventDefault();
    calculateBMI({ height, weight });
    setHeight("");
    setWeight("");
  };

  const calculateBMI = async (obj) => {
    if (!weight || !height || isNaN(height) || isNaN(weight)) {
      result = "";
      setBmi("");
      return;
    }
    try {
      const res = await axios.post(
        "https://bmi-9fe8.onrender.com/calculateBMI",
        obj
      );
      const data = res.data.bmi;
      setBmi(data);
    } catch (err) {
      console.log(err);
    }
  };

  if (bmi < 18.5) {
    result = "Underweight";
  } else if (bmi >= 18.5 && bmi < 24.9) {
    result = "Normal weight";
  } else if (bmi >= 24.9 && bmi < 29.9) {
    result = "Overweight";
  } else if (bmi >= 29.9) {
    result = "Obese";
  }

  return (
    <div style={{ textAlign: "center", padding: "100px", fontWeight: "bold" }}>
      <form
        action=""
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          alignContent: "center",
          gap: "10px",
        }}
      >
        <input
          type="number"
          placeholder="Height in meter"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          type="number"
          placeholder="Weight in kg"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      <div style={{ color: "red", marginTop: "5px" }}>BMI: {bmi}</div>
      <div style={{ color: "red", marginTop: "5px" }}>Result: {result}</div>
    </div>
  );
};
