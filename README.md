# Student Performance Predictor

This project includes a React frontend and a machine learning backend to predict student outcomes.


Student-Performance-Predictor\
├── ml-backend/ # Flask API with ML model\
├── public/ # React frontend public assets\
├── src/ # React frontend source code\
├── package.json # React frontend config
└── README.md<br>
<br>
How to run locally
Step 1: Clone the Repository
```
git clone https://github.com/mhaidara972/Student-Performance-Predictor.git
cd Student-Performance-Predictor 
```

Step 2: Start the Backend
```
cd ml-backend
python3 -m venv venv

# Activate the virtual environment:
source venv/bin/activate        # macOS/Linux
venv\Scripts\activate           # Windows

# Install required packages
pip install flask scikit-learn pandas

# Start the Flask server
python app.py

#This will start the backend at: http://localhost:5000
```
Step 3: Start the Frontend\
Open a new terminal in the root folder (where package.json is located)
```
npm install
npm start      # Start React app
