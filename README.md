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

## Screenshots (Web View)
Here are some screenshots of the iNEWS application:


<table>
  <tr>
    <td>1. Landing Page </td>
    <td>2. Home (URL Feature) Page</td>
  </tr>
  <tr>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/landing_page.png" height="250" ></td>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/home_url_page.png" height="250" ></td>
  </tr>
  <tr>
    <td>Home (TEXT Feature) Page</td>
    <td>Home (DOCX Feature) Page</td>
  </tr>
  <tr>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/home_text_page.png" height="250"></td>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/home_docs_page.png" height="250"></td>
  </tr>
  <tr>
    <td>Sign In Page</td>
    <td>Sign Up Page</td>
  </tr>
  <tr>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/login_page.png" height="250"></td>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/signup_page.png" height="250"></td>
  </tr>
  <tr>
    <td>Commnunity Page</td>
    <td>News Feed Page</td>
  </tr>
  <tr>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/community_page.png" height="250"></td>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/newsfeed_page.png" height="250"></td>
  </tr>
   <tr>
    <td>About Page</td>
    <td>How It Work Page</td>
  </tr>
  <tr>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/about_page.png" height="250"></td>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/how_page.png" height="250"></td>
  </tr>
</table>

## Screenshots (Web View)

<table>
  <tr>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/landing_mobile.png" height="250"></td>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/login_mobile.png" height="250"></td>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/home_mobile.png" height="250"></td>
    <td><img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/result_mobile.png" height="250"></td>
    </tr>
</table>

## Contributors
- Paul Wilfred Pabilonia (@PaulPabilonia12)
- Ermcharles P. Pailan (@ermcharles06)
- Jessa May D. Ubaldo (@ujessamay)
<img src="https://github.com/PaulPabilonia/CSA08-INEWS/blob/master/images/team_page.png" height="250">

## License
This project is licensed under the MIT License - see the LICENSE.md file for details.


