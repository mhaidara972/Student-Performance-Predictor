import React, { useState } from 'react';
import axios from 'axios';

const oneHotGroups = {
  "Marital Status": ["2", "3", "4", "5", "6"],
  "Application order": ["1", "2", "3", "4", "5", "6", "9"],
  "Application mode": ["1", "2", "5", "7", "10", "15", "16", "17", "18", "26", "27", "39", "42", "43", "44", "51", "53", "57"],
  "Course": ["171", "8014", "9003", "9070", "9085", "9119", "9130", "9147", "9238", "9254", "9500", "9556", "9670", "9773", "9853", "9991"],
  "Previous qualification": ["2", "3", "4", "5", "6", "9", "10", "12", "14", "15", "19", "38", "39", "40", "42", "43"],
  "Nacionality": ["2", "6", "11", "13", "14", "17", "21", "22", "24", "25", "26", "32", "41", "62", "100", "101", "103", "105", "108", "109"],
  "Mother's qualification": ["2","3","4","5","6","9","10","11","12","14","18","19","22","26","27","29","30","34","35","36","37","38","39","40","41","42","43","44"],
  "Father's qualification": ["2","3","4","5","6","9","10","11","12","13","14","18","19","20","22","25","26","27","29","30","31","33","34","35","36","37","38","39","40","41","42","43","44"],
  "Mother's occupation": ["1","2","3","4","5","6","7","8","9","10","90","99","122","123","125","131","132","134","141","143","144","151","152","153","171","173","175","191","192","193","194"],
  "Father's occupation": ["1","2","3","4","5","6","7","8","9","10","90","99","101","102","103","112","114","121","122","123","124","131","132","134","135","141","143","144","151","152","153","154","161","163","171","172","174","175","181","182","183","192","193","194","195"]
};

const binaryFields = [
  "Daytime/evening attendance_1",
  "Displaced_1",
  "Educational special needs_1",
  "Debtor_1",
  "Tuition fees up to date_1",
  "Gender_1",
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
    oneHotGroups[group].forEach(v => {
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

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:5000/predict", form);
    setPrediction(["Dropout", "Enrolled", "Graduate"][res.data.prediction]);
    const feats = await axios.get("http://localhost:5000/features");
    setFeatures(feats.data);
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Student Graduation Predictor</h1>

      {Object.entries(oneHotGroups).map(([group, options]) => (
        <div key={group}>
          <label>{group}: </label>
          <select onChange={(e) => handleChange(group, e.target.value)} defaultValue="">
            <option value="" disabled>Select {group}</option>
            {options.map(option => (
              <option key={option} value={option}>{group}_{option}</option>
            ))}
          </select>
        </div>
      ))}

      {binaryFields.map(field => (
        <div key={field}>
          <label>{field.replace("_1", "").replace(/_/g, ' ')}: </label>
          <input type="checkbox" onChange={e => handleBinaryChange(field, e.target.checked)} />
        </div>
      ))}

      {Object.entries(dropdownRangeFields).map(([field, values]) => (
        <div key={field}>
          <label>{field}: </label>
          <select onChange={(e) => handleRangeChange(field, e.target.value)} defaultValue="">
            <option value="" disabled>Select a value</option>
            {values.map(v => (
              <option key={v} value={v}>{v}</option>
            ))}
          </select>
        </div>
      ))}

      <button onClick={handleSubmit}>Predict</button>

      {prediction && <h2>Prediction: {prediction}</h2>}

      {features && (
        <div>
          <h3>Top 5 Important Features</h3>
          <ul>
            {Object.entries(features)
              .sort((a, b) => b[1] - a[1])
              .slice(0, 5)
              .map(([key, value]) => (
                <li key={key}>{key}: {value.toFixed(4)}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}





