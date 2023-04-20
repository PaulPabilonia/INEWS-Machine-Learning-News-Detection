from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk import FreqDist
from nltk import word_tokenize
from io import BytesIO
import PyPDF2
import docx2txt
import langdetect
from nltk.tokenize.punkt import PunktSentenceTokenizer, PunktParameters
import numpy
from collections import Counter
from nltk.stem.porter import PorterStemmer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk
import string
import re
from unittest import result
from newspaper import Article, Config
import pandas as pd
import pickle
from newsapi import NewsApiClient
import os
import sklearn

from googlesearch import search

# snscrape module
import snscrape.modules.twitter as twitterScraper
# graph
from pyvis.network import Network
from django.conf import settings
import webbrowser
import jsons
import random
import datetime

import numpy as np

# tensorflow
import tensorflow
from tensorflow import keras
from keras.layers import Embedding
from keras.utils.data_utils import pad_sequences
from keras.models import Sequential
from keras.preprocessing.text import one_hot, Tokenizer
from keras.layers import LSTM
from keras.layers import Dense

newsapi = NewsApiClient(api_key='9cd453b9a7344b4d95e90263abb33e89')


model = 'passiveAgressive.pkl'
path = os.path.abspath(model)
with open(r'api\pickle_models\pickles\decisionTree.pkl', 'rb') as f:
    decisionTree_model = pickle.load(f)
with open(r'api\pickle_models\pickles\logisticRegression.pkl', 'rb') as f:
    logisticRegression_model = pickle.load(f)
with open(r'api\pickle_models\fuzzy_model\fuzzy_naiveBayesT.pkl', 'rb') as f:
    naiveBayes_model = pickle.load(f)
with open(r'api\pickle_models\pickles\naiveBayes.pkl', 'rb') as f:
    nb_model = pickle.load(f)
with open(r'api\pickle_models\pickles\passiveAgressive.pkl', 'rb') as f:
    passiveaggressive_model = pickle.load(f)
with open(r'api\pickle_models\pickles\svm.pkl', 'rb') as f:
    svm_model = pickle.load(f)
with open(r'api\pickle_models\pickles\randomForest.pkl', 'rb') as f:
    randomForest_model = pickle.load(f)

# with open(r'api\pickle_models\FOD\FOD2_naiveBayes.pkl', 'rb') as f:
#     nb_Fod_Model = pickle.load(f)
# with open(r'api\pickle_models\FOD\FOD2_vectorization.pickle', 'rb') as f:
#     vectorizer_fod = pickle.load(f)
# with open(r'api\pickle_models\FOD\FOD2_svm.pkl', 'rb') as f:
#     svm_Fod_Model = pickle.load(f)

with open(r'api\pickle_models\FOD\FOD2_naiveBayes.pkl', 'rb') as f:
    nb_Fod_Model = pickle.load(f)
with open(r'api\pickle_models\FOD\FOD2_vectorization.pickle', 'rb') as f:
    vectorizer_fod = pickle.load(f)
with open(r'api\pickle_models\models\Final_SVM.pkl', 'rb') as f:
    svm_Fod_Model = pickle.load(f)

lstm_model = keras.models.load_model(
    'api\pickle_models\pickles\lstm_models.h5')
text_gen_model = keras.models.load_model(
    'api\pickle_models\\text_gen\\text_gen_1064.h5')

# vec = 'vectorizer.pickle'
# path_vec = os.path.abspath(vec)
with open(r'api\pickle_models\models\Final_vectorization.pickle', 'rb') as v:
    tfidf_vectorizer = pickle.load(v)

with open(r'api\pickle_models\pickles\vectorization.pickle', 'rb') as v:
    vectorizer = pickle.load(v)

with open(r'api\pickle_models\\text_gen\\tokenizer_1064.pkl', 'rb') as v:
    tokenizer = pickle.load(v)



with open(r'api\pickle_models\models\SVM_model.pkl', 'rb') as f:
    svm_Fod_Model1 = pickle.load(f)
# nltk.download('stopwords')
# nltk.download('wordnet')
# nltk.download('omw-1.4')

ps = PorterStemmer()
wnl = nltk.stem.WordNetLemmatizer()

stop_words = stopwords.words('english')
stopwords_dict = Counter(stop_words)

# Sentence Segmantation function
"""
This sentence segmentation function
for fuzzy predictions.

Note: add it to prediction functions for multiple predictions
"""


def sentence_segmentation(text):
  punkt_param = PunktParameters()
  abbreviation = ['f', 'fr', 'k', 'dr', 'jr', 'sr']
  punkt_param.abbrev_types = set(abbreviation)
  # Training a new model with the text.
  tokenizer = PunktSentenceTokenizer(punkt_param)
  tokenizer.train(text)
  sentence_tokens = tokenizer.tokenize(text)
  return sentence_tokens

# for language detection


def language_detection(text):
    lang = langdetect.detect(text)
    return lang


# Sentence Segmantation function


def sentence_segmentation_counter(text):
    punkt_param = PunktParameters()
    abbreviation = ['f', 'fr', 'k', 'dr', 'jr', 'sr']
    punkt_param.abbrev_types = set(abbreviation)
    # Training a new model with the text.
    tokenizer = PunktSentenceTokenizer(punkt_param)
    tokenizer.train(text)
    sentence_tokens = tokenizer.tokenize(text)
    sentence_count = len(sentence_tokens)
    return sentence_count


def get_linguistic(text):
    uppercase_count = sum(map(str.isupper, text))
    lowercase_count = sum(map(str.islower, text))
    num_counts = sum(map(str.isdigit, text))
    lang = langdetect.detect(text)
    at_count = text.count('@')
    question_count = text.count('?')
    slash_count = text.count('/')
    hashtag_count = text.count('#')
    word_count = len(str(text).split(" "))
    char_count = sum(len(word) for word in str(text).split(" "))
    sentence_count = sentence_segmentation_counter(text)
    avg_word_lengths = int(char_count) / int(word_count)
    avg_sentence_lengths = int(word_count) / int(sentence_count)

    avg_word_length = np.round(avg_word_lengths, 2)
    avg_sentence_length = np.round(avg_sentence_lengths, 2)

    linguistic = {
            'lang': lang,
            'uppercase_count': uppercase_count,
            'lowercase_count': lowercase_count,
            'num_counts': num_counts,
            'at_count': at_count,
            'question_count': question_count,
            'slash_count': slash_count,
            'hashtag_count': hashtag_count,
            'word_count': word_count,
            'char_count': char_count,
            'sentence_count': sentence_count,
            'avg_word_length': avg_word_length,
            'avg_sentence_lenght': avg_sentence_length
    }

    
    return linguistic


def get_sentiment(text):
   # nltk.download('vader_lexicon')
    # sentiment_compound = SentimentIntensityAnalyzer().polarity_scores(text)['compound']
    sentiment_pos = SentimentIntensityAnalyzer().polarity_scores(text)['pos']
    sentiment_neg = SentimentIntensityAnalyzer().polarity_scores(text)['neg']
    sentiment_neu = SentimentIntensityAnalyzer().polarity_scores(text)['neu']
    # determine the sentiment of the text based on the positive, negative, and neutral scores
    if sentiment_pos > sentiment_neg and sentiment_pos > sentiment_neu:
        sentiment = "positive"
    elif sentiment_neg > sentiment_pos and sentiment_neg > sentiment_neu:
        sentiment = "negative"
    else:
        sentiment = "neutral"

    sentiment_scores = {
            'sentiment': sentiment,
            'sentiment_pos': sentiment_pos,
            'sentiment_neg': sentiment_neg,
            'sentiment_neu': sentiment_neu
    }

    return sentiment_scores


# Cleaning text from unused characters
def clean_text(text):
    # Remove HTML tags
    text = BeautifulSoup(text, "html.parser")
    text = str(text).replace(r'https[\w:/\.]+', ' ')  # removing urls
    # remove everything but characters and punctuation
    text = str(text).replace(r'[^\.\w\s]', ' ')
    text = str(text).replace('[^a-zA-Z]', ' ')
    text = re.sub(r'[ \t\n]+', ' ', text).strip()#removing '\n'
    text = re.sub(r'\s+', ' ', text).strip()
    text = text.lower().strip()
    # text = ' '.join(text)
    return text

from bs4 import BeautifulSoup

def clean_article(text):
    # Remove HTML tags
    soup = BeautifulSoup(text, "html.parser")
    text = soup.get_text()
    text = str(text).replace(r'http[\w:/\.]+', ' ')  # removing urls
    text = re.sub(r'[ \t\n]+', ' ', text).strip()#removing '\n'
    # remove everything but characters and punctuation
    text = str(text).replace(r'[^\.\w\s]', ' ')
    text = re.sub(r'\s+', ' ', text).strip()
    
    # text = ' '.join(text)
    return text
# Nltk Preprocessing include:
# Stop words, Stemming and Lemmetization
# For our project we use only Stop word removal


def nltk_preprocess(text):
    text = clean_text(text)
    wordlist = re.sub(r'[^\w\s]', '', text).split()
    # text = ' '.join([word for word in wordlist if word not in stopwords_dict])
    # text = [ps.stem(word) for word in wordlist if not word in stopwords_dict]
    text = ' '.join([wnl.lemmatize(word)
                    for word in wordlist if word not in stopwords_dict])
    return text

# embeding


def embedding_docs(words):
    # Vocabulary size
    voc_size = 5000
    onehot_repr = [one_hot(words, voc_size)]
    sent_length = 1000
    embedded_docs = pad_sequences(
        onehot_repr, padding='pre', maxlen=sent_length)
    pred_lstm = np.array(embedded_docs)

    return pred_lstm

def predict_verdict(text):
    bow_text = nltk_preprocess(text)
    print("Text: ", text)
    print("BOW: ", bow_text)
    # tfidf_test = tfidf_vectorizer.transform([bow_text])
    tfidf_test = vectorizer_fod.transform([bow_text])

    # pred_dt = decisionTree_model.predict(tfidf_test)
    # pred_lr = logisticRegression_model.predict(tfidf_test)

    # pred_pa = passiveaggressive_model.predict(tfidf_test)
    # pred_svm = svm_model.predict(tfidf_test)
    # pred_rf = randomForest_model.predict(tfidf_test)
    # lstm
    # lstm_arr = np.array(tfidf_test[0],ndmin=2)
    # lstm_arr = embedding_docs(bow_text)
    # pred_lstm=(lstm_model.predict(lstm_arr) > 0.5).astype("int32")
    # print("pred_lstm",pred_lstm[0][0], pred_lstm[0])

    # print(pred_nb, pred_svm,pred_lstm[0])
    try:
        prediction = []
        # pred_label = naiveBayes_model.predict(tfidf_test)
        # pred_score = naiveBayes_model.predict_proba(tfidf_test)

        pred_label = svm_Fod_Model1.predict(tfidf_test)
        pred_score = svm_Fod_Model1.predict_proba(tfidf_test)

        print('SVM:',pred_label, pred_score)

        # pred_label = svm_Fod_Model.predict(tfidf_test)
        # pred_score = svm_Fod_Model.predict_proba(tfidf_test)
        formatted_numbers = numpy.round(pred_score * 100, 2)

        value = pred_label[0]


        if value == 0:
            verdict = 'true'
        elif value == 1:
            verdict = 'mostly-true'
        elif value == 2:
            verdict = 'half-true'
        elif value == 3:
            verdict = 'mostly-false'
        elif value == 4:
            verdict = 'false'
        elif value == 5:
            verdict = 'pants-fire'
        else:
            verdict = 'Invalid value'

        print(verdict)

        prediction.append(verdict)
        prediction.append(formatted_numbers[0])

        # prediction.append(pred_svm[0])

        # prediction.append(pred_lstm[0][0])

    except ValueError:
        prediction = 'INVALID'
        return prediction

    # print("Prediction: ",prediction)
    # # count zeros in 1d array
    # n_zeros = prediction.count(0)
    # # display the count of zeros
    # print("number of Zero: ",n_zeros)

    # if n_zeros >= 2:
    #     result = 'REAL'
    # elif n_zeros < 2:
    #     result = 'FAKE'
    # else:
    #     result = 'INVALID'
    return prediction

def predict_fake(text):
    bow_text = nltk_preprocess(text)
    print("Text: ", text)
    print("BOW: ", bow_text)
    tfidf_test = vectorizer_fod.transform([bow_text])  
    vectors= tfidf_vectorizer.transform([bow_text])
    vectors_text = pd.DataFrame.sparse.from_spmatrix(vectors)
    vectors_text

    linguistic = get_linguistic(text)
    linguistic.pop('lang')
    linguistic = pd.DataFrame([linguistic])

    sentiment = get_sentiment(text)
    sentiment.pop('sentiment')
    sentiment = pd.DataFrame([sentiment])

    #concatenate features
    # Concatenate the text analysis, sentiment analysis, and TfidfVectorizer results horizontally
    result_df = pd.concat([vectors_text, sentiment, linguistic], axis=1)
    result_df.columns = result_df.columns.astype(str)

    try:
        prediction = []

        pred_label = svm_Fod_Model.predict(result_df)
        pred_score = svm_Fod_Model.predict_proba(result_df)
        pred_label1 = svm_Fod_Model1.predict(tfidf_test)
        pred_score1 = svm_Fod_Model1.predict_proba(tfidf_test)

        print('SVM:',pred_label, pred_score)

        formatted_numbers = numpy.round(pred_score * 100, 2)

        value = pred_label[0]


        if value == 0:
            verdict = 'true'
        elif value == 1:
            verdict = 'mostly-true'
        elif value == 2:
            verdict = 'half-true'
        elif value == 3:
            verdict = 'mostly-false'
        elif value == 4:
            verdict = 'false'
        elif value == 5:
            verdict = 'pants-fire'
        else:
            verdict = 'Invalid value'

        print(verdict)

        prediction.append(verdict)
        prediction.append(formatted_numbers[0])

    except ValueError:
        prediction = 'INVALID'
        return prediction

    return prediction

#Predict sentences
def predict_sentence(text):

    bow_text = nltk_preprocess(text)
    print("Text: ", text)
    print("BOW: ", bow_text)
    tfidf_test = vectorizer.transform([bow_text])

    try:
        prediction = []
        pred_label = nb_model.predict(tfidf_test)
        pred_score = nb_model.predict_proba(tfidf_test)
        formatted_numbers = numpy.round(pred_score * 100, 2)
        print('formatted_numbers',formatted_numbers[0])

        prediction.append(pred_label[0])
        prediction.append(formatted_numbers[0])

    except ValueError:
        prediction = 'INVALID'
        return prediction
    
    print(prediction)
    
    return prediction


def predict_url(url):
    summary = None
    try:
        config = Config()
        config.request_timeout = 15
        print('URL:', url.strip())
        article = Article(url, config=config)
        print('article:', article)
        article.download()
        article.parse()
        article.nlp()

        # if len(article.text):
        #     return[str(article.title)]+(["INVALID"]*3)
        # article.nlp()
        # print("Title: "+str(article.title)+" TEXT: "+str(article.text)+" Summary: "+str(article.summary))
        # print("authors",article.authors)
        # print("Keywords: ",article.keywords)
        

        datetimeInstance = datetime.datetime.today()
        if article.publish_date is None:
            published_date = datetimeInstance.date()
        else:
            published_date = article.publish_date.date()
        # can be add to predictions
        text = article.title+" "+article.text
        summary = clean_article(text)
        print('summary:',summary)
        
        verdict = predict_fake(summary)
        return [str(article.title), verdict, summary, article.top_image, article.authors, published_date, article.keywords]
        
    except ValueError:
        return(["INVALID"]*6)
    finally:
        
        return [str(article.title), verdict, summary, article.top_image, article.authors, published_date, article.keywords]


def get_headlines():
    final = []
    top_headlines = newsapi.get_top_headlines(language='en', country='ph')

    for i in top_headlines['articles']:
        # k=predict_url(i['url'])k[1]
        final.append([i['url'], i['title'], i['description'], i['source']
                     ['name'], i['urlToImage'], i['publishedAt'][0:10]])

    return final



def hex_code_colors():
    a = hex(random.randrange(0, 256))
    b = hex(random.randrange(0, 256))
    c = hex(random.randrange(0, 256))
    a = a[2:]
    b = b[2:]
    c = c[2:]
    if len(a) < 2:
        a = "0" + a
    if len(b) < 2:
        b = "0" + b
    if len(c) < 2:
        c = "0" + c
    z = a + b + c
    return "#" + z.upper()
# fucntion for scraping related tweets


def scrape_tweet(keyword):
    print(keyword.replace(',', ' OR '))
    keywords = keyword.replace(',', ' OR ')
    scraper = twitterScraper.TwitterSearchScraper(keywords)
    datetimeInstance = datetime.datetime.today()
    url = []
    tweets = []
    for i, tweet in enumerate(scraper.get_items()):
        print(i, ' : Reply to ', tweet.inReplyToTweetId)
        color = hex_code_colors()
        if i > 3:
            break
        elif i == 0:
            tweets.append({
                "color": "#000000",
                "id": i,
                "label": "news",
                "shape": "dot",
                "title": "news",
                "value": 10,
                "tweet_id": "none",
                "url": "none",
                "date": f"{datetimeInstance.date()}"
            })
        else:
            tweets.append({
                "color": color,
                "id": i,
                "label": f"tweet {i}",
                "shape": "dot",
                "title": tweet.user.username,
                "value": 10,
                "tweet_id": f"{tweet.id}",
                "url": tweet.url,
                "date": f"{tweet.date.date()}"
            })
        # f= open("fakenews/templates/fakenews/tweets.json",'w')
        # j= jsons.dumps(tweets)
        # f.write(j)
        # f.close()
        url.append(tweet.url)
    # print("tweets URLS:", tweets)
    return tweets


def scrape_tweets_replies_network(keyword):
    tweets = []
    replies = []
    query = keyword.replace(',', ' OR ')
    print('query: ', query)
    scraper = twitterScraper.TwitterSearchScraper(query)
    for i, tweet in enumerate(scraper.get_items()):
        print(i, ' ', tweet.id, ' : Reply to ', tweet.inReplyToTweetId)
        if i > 3:
              break
        if tweet.inReplyToTweetId is not None:
            replies.append(tweet)
            tweets.append(tweet.inReplyToTweetId)
        else:
            tweets.append(tweet.id)

    # Create the nodes and edges lists
    nodes = []
    edges = []
    id_counter = 0

    if id_counter == 0:
      nodes.append({"id": id_counter, "twitter_id": '1616179085507702785',
                   'reply_to': None, "label": "News", "title": "News", "color": "#000000"})
      id_counter += 1
    # Add the tweets as nodes
    for tweet in tweets:
        color = hex_code_colors()
        nodes.append({"id": id_counter, "twitter_id": f'{tweet}',
                     'reply_to': None, "label": f"tweet {i}", "color": color, })
        id_counter += 1

    # Add the replies as nodes
    for reply in replies:
        color = hex_code_colors()
        nodes.append({"id": id_counter, "twitter_id": f'{reply.id}',
                     'reply_to': f'{reply.inReplyToTweetId}', "label": f"reply {i}", "color": color, })
        id_counter += 1

    # Add edges between tweets and replies
    for tweet in nodes:
        is_connected = False
        for reply in nodes:
            if reply['reply_to'] == tweet['twitter_id'] and reply['reply_to'] is not None:
                edges.append({"from": tweet['id'], "to": reply['id']})
                is_connected = True
        if not is_connected:
            edges.append({"from": tweet['id'], "to": nodes[0]["id"]})

    # Create the data object
    data = {"nodes": nodes, "edges": edges}

    return data

# yes aticle to scrape all the urls


def search_news(query):
    # text = nltk_preprocess(query)
    # print("search_nltk :", text)
    urls = []
    search_query = "Is it true that "+query
    print("search_query: ", search_query)
    for i in search(search_query, tld="co.in", num=5, stop=5, pause=10):
        urls.append(i)
    print(urls)
    return urls


def news_details(urls):
    news = []
    count = 1
    for url in urls:
        config = Config()
        config.request_timeout = 15

        try:
            news_article = Article(url, config=config)
            news_article.download()
            news_article.parse()
            news_article.nlp()

            datetimeInstance = datetime.datetime.today()
            if news_article.publish_date is None:
                published_date = datetimeInstance.date()
            else:
                published_date = news_article.publish_date.date()
            # item = [str(news_article.title), news_article.top_image, published_date, url]
            # news.append(item)
            # news['title'] = news_article.title
            # news['image'] = news_article.top_image
            # news['date'] = published_date
            # news['url'] = url

            item = {
                'id': count,
                'title': news_article.title,
                'image': news_article.top_image,
                'date': published_date,
                'url': url
            }
            count = count + 1
            news.append(item)
        except:
            item = {
                'id': count,
                'title': None,
                'image': None,
                'date': None,
                'url': None
            }
            count = count + 1
            news.append(item)

    print(news)
    return news


def network_graph(tweet_id):
    network = Network()
    # i = 0
    # for tweet_node in tweet_id:
    #     network.add_node(i, label=i, title = tweet_node)
    #     network.add_edge(0, i+1)
    #     i=i+1
    id = []
    print(id)
    print(tweet_id)
    for i in range(len(tweet_id)):
        id.append(i)
    network.add_nodes(id, title=tweet_id, label=tweet_id,)
    # network.add_node(0,label= "I am a node with a link", title="<a href='http://www.google.com\'>google </a>")
    # network.add_edge(0, 1)
    # network.add_edge(0, 2)
    # network.add_edge(0, 3)

    net = network.save_graph('fakenews/templates/fakenews/pvis_graph.html')
    return net


# Text Generations
reverse_word_map = dict(map(reversed, tokenizer.word_index.items()))


def gen(seq, max_len=15):
    ''' Generates a sequence given a string seq using specified model until the total sequence length
    reaches max_len'''
    # Tokenize the input string
    tokenized_sent = tokenizer.texts_to_sequences([seq])
    max_len = max_len+len(tokenized_sent[0])
    # If sentence is not as long as the desired sentence length, we need to 'pad sequence' so that
    # the array input shape is correct going into our LSTM. the `pad_sequences` function adds
    # zeroes to the left side of our sequence until it becomes 19 long, the number of input features.
    while len(tokenized_sent[0]) < max_len:
        padded_sentence = pad_sequences(tokenized_sent[-14:], maxlen=14)
        op = text_gen_model.predict(np.asarray(padded_sentence).reshape(1, -1))
        tokenized_sent[0].append(op.argmax()+1)

    return " ".join(map(lambda x: reverse_word_map[x], tokenized_sent[0]))


# Import the os module
# Import the necessary modules

# Function for extracting and cleaning text from docx files

def extract_and_clean_text_from_docx(file_name):
    # Extract the text from the docx file
    text = docx2txt.Docx2Txt(file_name).process_file()

    # Clean the text by removing leading and trailing whitespace characters
    # and replacing multiple spaces with a single space
    text = text.strip().replace('\n', ' ').replace('\r', ' ')
    text = ' '.join(text.split())

    # Return the cleaned text
    return text

# Function for extracting and cleaning text from pdf files


def extract_and_clean_text_from_pdf(file_name):
    # Open the file in read-only mode
    # pdf_file = open(file_name, 'rb')

    # Create a PyPDF2 object for the file
    pdf_reader = PyPDF2.PdfFileReader(file_name)

    # Initialize an empty string to store the text
    text = ''

    # Iterate over each page of the file
    for page in pdf_reader.pages:
        # Extract the text from the page
        text += page.extractText()

    # Close the file
    # pdf_file.close()

    # Clean the text by removing leading and trailing whitespace characters
    # and replacing multiple spaces with a single space
    text = text.strip().replace('\n', ' ').replace('\r', ' ')
    text = ' '.join(text.split())

    # Return the cleaned text
    return text

# Function for extracting and cleaning text from docx or pdf files


def extract_and_clean_text(file_name):
    file_extention = file_name.name
    print(file_extention)
    if file_extention.endswith(".docx"):
        return extract_and_clean_text_from_docx(file_name)
     # If the file is a pdf file, extract and clean the text using the
    # extract_and_clean_text_from_pdf() function
    elif file_extention.endswith(".pdf"):
        return extract_and_clean_text_from_pdf(file_name)
    else:
        return None


def get_keywords(text):

    # Convert the text to lowercase
    text = text.lower()

    # Remove punctuation
    text = text.translate(str.maketrans('', '', string.punctuation))

    # Tokenize the text into words
    tokens = word_tokenize(text)

    # Filter out stopwords
    stop_words = set(stopwords.words('english'))
    tokens = [w for w in tokens if w not in stop_words]

    # Count the frequency of each word
    fdist = FreqDist(tokens)

    # Get the 10 most common keywords
    keywords = fdist.most_common(10)

    # Return only the words, not the counts
    keywords = [word for word, count in keywords]

    # Join the keywords into a single string
    return ', '.join(keywords)

def max_score(scores):
    max_score = scores[0]
    for score in scores:
        if score > max_score:
            max_score = score
    return max_score

def predict_sentences(sentences):
    sentences_values = []
    for i, sentence in enumerate(sentences):
        verdict = predict_verdict(sentence)
        prediction = predict_sentence(sentence)
        score = prediction[1][0]
        # urls = search_news(sentence)
        # urls = []
        sentiment = get_sentiment(sentence)
        sentences_values.append({
            'id': i, 
            'verdict': verdict[0], 
            'sentence': sentence, 
            'score':score,
            'sentiment':sentiment
            })
            
    return sentences_values