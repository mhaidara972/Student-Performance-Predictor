# Student Performance Predictor

This project includes a React frontend and a machine learning backend to predict student outcomes.


Student-Performance-Predictor\
├── ml-backend/ # Flask API with ML model\
├── public/ # React frontend public assets\
├── src/ # React frontend source code\
├── package.json # React frontend config\
└── README.md<br>
<br>
*The purpose behind our project is to answer our research question which is “How can we use student information on their weekly study hours, demographics, class attendance, extracurricular activities to predict their performance?” Technologies used include Python, Pandas, scikit-learn, XGBoost, React, Flask, JavaScript, HTML, CSS.*


## Problem Statement 

*The pandemic has still affected many students until now. We see a decline in reading and writing abilities of students. As a result, many students are struggling with classes and are scoring low grades. We want to view the future grades of students to help prevent failed grades and future dropouts at a college level. Understanding what factors impact student success can help students improve their habits. Students can use this model when determining their academic schedule and involvement. Teachers can use this model in classrooms to assess the learning levels of their students.*


## Key Results 

1. *Built a machine learning pipeline to predict student academic outcomes using real-world educational data.*
2. *Preprocessed over 30 columns by cleaning missing values, mapping target labels, removing duplicates, and encoding categorical variables using one-hot encoding.*
3. *Developed a machine learning model using XGBoost to predict college student academic performance with 91% accuracy.*
4. *Created a dynamic user interface using React and Flask to effectively showcase results.*



## Methodologies 





*To accomplish this, we first researched and selected a dataset that records over 4,400 student records, containing academic, demographic, and behavioral features. We processed and analyzed the data using pandas to display graphs and detect patterns throughout the data. We then utilized the XGBoost to train the machine learning model to 91% accuracy. The model was then used to create a user interface that allows users to predict academic results.*


## Data Sources 
*Predict Students’ Dropout: https://archive.ics.uci.edu/dataset/697/predict+students+dropout+and+academic+success*

*Kaggle Data Set: https://www.kaggle.com/code/adilshamim8/student-success-analysis/input*

## Google Colab Link 
[Predict Students’ Dropout: https://archive.ics.uci.edu/dataset/697/predict+students+dropout+and+academic+success*](https://colab.research.google.com/drive/1-K3Z85C3w3njMiP9WV0tJ1LLkIOyoA74?usp=chrome_ntp#scrollTo=EnFHuytN6eKq)

## Technologies Used 

*Python*\
*Pandas*\
*Scikit-learn*\
*XGBoost Classifier*\
*React*\
*Flask*\
*JavaScript*\
*HTML*\
*CSS*



## Authors 
*This project was completed in collaboration with:*

*Julian Alvarado ([jalvarado@colgate.edu](GitHub profile: Julian1321))*
*Eva Dimitrova ([edimitro@terpmail.umd.edu](GitHub profile: EvaDimitrova))*
*Nkiruka Ibe ([nkirukaibe05@gmail.com](GitHub profile:*
*Mohamed Haidara ([mhaidar2@umbc.edu](GitHub profile: mhaidara972))*

## How to run locally 

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
pip install flask flask-cors scikit-learn xgboost pandas

# If using Mac, install OpenMP runtime for XGBoost to work
brew install libomp

# Start the Flask server
python app.py

# This will start the backend at: http://localhost:3000
```
Step 3: Start the Frontend\
Open a new terminal in the root folder 
```
npm install
npm start      # Start React app

```

