import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const oneHotGroups = {
  "Marital Status": [
    { value: "1", label: "Single" },
    { value: "2", label: "Married" },
    { value: "3", label: "Widower" },
    { value: "4", label: "Divorced" },
    { value: "5", label: "Facto Union" },
    { value: "6", label: "Legally Separated" }
  ],
  "Application order": Array.from({ length: 10 }, (_, i) => ({ value: String(i), label: `${i + 1} Choice` })),
  "Application mode": [
    { value: "1", label: "1st phase - general contingent" },
    { value: "2", label: "Ordinance No. 612/93" },
    { value: "5", label: "1st phase - special contingent (Azores Island)" },
    { value: "7", label: "Holders of other higher courses" },
    { value: "10", label: "Ordinance No. 854-B/99" },
    { value: "15", label: "International student (bachelor)" },
    { value: "16", label: "1st phase - special contingent (Madeira Island)" },
    { value: "17", label: "2nd phase - general contingent" },
    { value: "18", label: "3rd phase - general contingent" },
    { value: "26", label: "Ordinance No. 533-A/99, item b2) (Different Plan)" },
    { value: "27", label: "Ordinance No. 533-A/99, item b3 (Other Institution)" },
    { value: "39", label: "Over 23 years old" },
    { value: "42", label: "Transfer" },
    { value: "43", label: "Change of course" },
    { value: "44", label: "Technological specialization diploma holders" },
    { value: "51", label: "Change of institution/course" },
    { value: "53", label: "Short cycle diploma holders" },
    { value: "57", label: "Change of institution/course (International)" }
  ],
  "Course": [
    { value: "33", label: "Biofuel Production Technologies" },
    { value: "171", label: "Animation and Multimedia Design" },
    { value: "8014", label: "Social Service (evening attendance)" },
    { value: "9003", label: "Agronomy" },
    { value: "9070", label: "Communication Design" },
    { value: "9085", label: "Veterinary Nursing" },
    { value: "9119", label: "Informatics Engineering" },
    { value: "9130", label: "Equinculture" },
    { value: "9147", label: "Management" },
    { value: "9238", label: "Social Service" },
    { value: "9254", label: "Tourism" },
    { value: "9500", label: "Nursing" },
    { value: "9556", label: "Oral Hygiene" },
    { value: "9670", label: "Advertising and Marketing Management" },
    { value: "9773", label: "Journalism and Communication" },
    { value: "9853", label: "Basic Education" },
    { value: "9991", label: "Management (evening attendance)" }
  ]
};

const binaryFields = [
  "Daytime/evening attendance_1",
  "Displaced_1",
  "Educational special needs_1",
  "Debtor_1",
  "Tuition fees up to date_1",
  "Male_1",
  "Female_1",
  "Scholarship holder_1",
  "International_1"
];

const dropdownRangeFields = {
  "Curricular units 1st sem (credited)": [0, 1, 2, 3, 4, 5, 6],
  "Curricular units 1st sem (enrolled)": [0, 1, 2, 3, 4, 5, 6, 7],
  "Curricular units 1st sem (evaluations)": [0, 1, 2, 3, 4, 5, 6, 7],
  "Curricular units 1st sem (approved)": [0, 1, 2, 3, 4, 5, 6, 7],
  "Curricular units 1st sem (grade)": [0, 5, 10, 12, 14, 16, 18, 20],
  "Curricular units 1st sem (without evaluations)": [0, 1, 2, 3],
  "Curricular units 2nd sem (credited)": [0, 1, 2, 3, 4, 5, 6],
  "Curricular units 2nd sem (enrolled)": [0, 1, 2, 3, 4, 5, 6, 7],
  "Curricular units 2nd sem (evaluations)": [0, 1, 2, 3, 4, 5, 6, 7],
  "Curricular units 2nd sem (approved)": [0, 1, 2, 3, 4, 5, 6, 7],
  "Curricular units 2nd sem (grade)": [0, 5, 10, 12, 14, 16, 18, 20],
  "Curricular units 2nd sem (without evaluations)": [0, 1, 2, 3]
};

export default function App() {
  const [form, setForm] = useState({});
  const [prediction, setPrediction] = useState(null);
  const [features, setFeatures] = useState(null);

  const handleChange = (group, value) => {
    const updatedForm = { ...form };
    oneHotGroups[group].forEach(({ value: v }) => {
      updatedForm[`${group}_${v}`] = 0;
    });
    updatedForm[`${group}_${value}`] = 1;
    setForm(updatedForm);
  };

  const handleBinaryChange = (field, checked) => {
    setForm({ ...form, [field]: checked ? 1 : 0 });
  };

  const handleRangeChange = (field, value) => {
    setForm({ ...form, [field]: parseFloat(value) });
  };

  const [confidence, setConfidence] = useState(null);

  const handleSubmit = async () => {
  const res = await axios.post("http://localhost:5000/predict", form);
  setPrediction(["Dropout", "Graduate"][res.data.prediction]);
  setConfidence(res.data.confidence);

  const feats = await axios.get("http://localhost:5000/features");
  };

  
  

  return (
    <div className="app-container">
      <h1 className="app-title">Student Graduation Predictor</h1>
      
      <div className="form-container">
        <div className="form-section">
          <h2 className="section-title">Personal Information</h2>
          {Object.entries(oneHotGroups).map(([group, options]) => (
            <div key={group} className="form-group">
              <label className="form-label">{group}: </label>
              <select className="form-select" onChange={(e) => handleChange(group, e.target.value)} defaultValue="">
                <option value="" disabled>Select {group}</option>
                {options.map(({ value, label }) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <div className="form-section">
          <h2 className="section-title">Student Status</h2>
          {binaryFields.map(field => (
            <div key={field} className="form-group checkbox-group">
              <label className="checkbox-label">
                <input 
                  type="checkbox" 
                  className="form-checkbox"
                  onChange={e => handleBinaryChange(field, e.target.checked)} 
                />
                {field.replace("_1", "").replace(/_/g, ' ')}
              </label>
            </div>
          ))}
        </div>

        <div className="form-section">
          <h2 className="section-title">Academic Performance</h2>
          {Object.entries(dropdownRangeFields).map(([field, values]) => (
            <div key={field} className="form-group">
              <label className="form-label">{field}: </label>
              <select className="form-select" onChange={(e) => handleRangeChange(field, e.target.value)} defaultValue="">
                <option value="" disabled>Select a value</option>
                {values.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button className="predict-button" onClick={handleSubmit}>Predict Student Outcome</button>

        {prediction && (
  <div className={`prediction-result ${prediction.toLowerCase()}`}>
    <h2>Prediction: {prediction}</h2>
    {confidence !== null && (
      <p>Confidence: {(confidence * 100).toFixed(2)}%</p>
    )}
  </div>
)}

      </div>
    </div>
  );
}






