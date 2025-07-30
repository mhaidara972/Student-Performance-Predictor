# Student Performance Predictor

This project includes a React frontend and a machine learning backend to predict student outcomes.


Student-Performance-Predictor\
├── ml-backend/ # Flask API with ML model\
├── public/ # React frontend public assets\
├── src/ # React frontend source code\
├── package.json # React frontend config
└── README.md<br>
<br>
How to run locally\
Step 1: Clone the Repository\
git clone https://github.com/mhaidara972/Student-Performance-Predictor.git<br>
cd Student-Performance-Predictor\
<br>
Step 2: Start the Backend<br>
cd ml-backend<br>
python3 -m venv venv<br>
source venv/bin/activate        # macOS/Linux<br>
venv\Scripts\activate           # Windows<br>
pip install -r requirements.txt (if not installed already)<br>
python app.py<br>
<br>
This will start the backend at: http://localhost:5000<br>
<br>
Step 3: Start the Frontend<br>
Open a new terminal in the root folder (where package.json is located):<br>
npm install<br>
npm start      # Start React app<br>
