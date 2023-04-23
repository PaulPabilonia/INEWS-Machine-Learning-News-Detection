# CSA08-INEWS
iNEWS: A WEB APPLICATION FOR FAKE NEWS DETECTION USING MACHINE LEARNING TECHNIQUES

# Introduction
iNEWS is a web application that utilizes machine learning techniques to detect fake news articles. The application is built using React-Vite for the frontend and Django Rest Framework for the backend. The machine learning models used in the application are Naive Bayes, SVM, and LSTM.

## Installation
To install the application, follow the steps below:

### 1. Clone the repository
```git clone https://github.com/PaulPabilonia/CSA08-INEWS.git```

### 2. Install frontend dependencies
```
cd frontend
npm install
```

### 3. Install backend dependencies
```
cd ../backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```

## Usage
To start the application, follow the steps below:
1. Start the backend server:
```
cd backend
source env/bin/activate
python manage.py runserver
```
2. Start the frontend server:
```
cd frontend
npm run dev
```
3. Open the application in your browser:
```
http://localhost:5173
```

## Screenshots
Here are some screenshots of the iNEWS application:

1. Landing Page
<img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/Screenshot_20230130_103724.png" width="100" height="100"/>
![Landing Page](https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/Screenshot_20230130_103724.png)
2. Home Page
![Home Page](https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/Screenshot_20230111_092204.png)

Screenshot 2

## Contributors
- Paul Wilfred Pabilonia (@PaulPabilonia12)
- Ermcharles P. Pailan (@ermcharles06)
- Jessa May D. Ubaldo (@ujessamay)

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.


