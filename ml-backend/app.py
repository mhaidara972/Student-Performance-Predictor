from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)
model = joblib.load("model.pkl")
columns = joblib.load("columns.pkl")

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df = pd.DataFrame([data], columns=columns)
    prediction = model.predict(df)[0]
    probabilities = model.predict_proba(df)[0]
    confidence = float(max(probabilities))  
    return jsonify({
        "prediction": int(prediction),      
        "confidence": confidence            
    })
    

@app.route('/features', methods=['GET'])
def features():
    return jsonify(dict(zip(columns, model.feature_importances_.tolist())))  

if __name__ == '__main__':
    app.run(debug=True)
