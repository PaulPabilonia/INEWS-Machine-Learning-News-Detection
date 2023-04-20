# from django.test import TestCase

# # Create your tests here.
# # import utils
# # from utils import predict_sentences,predict_sentence,predict_fake, predict_url,clean_article,clean_text

# # summary = "<p>This is some <b>text</b> with HTML tags.</p> source: TV statement: in https://chat.openai.com/chat \nMembers of the House of Representatives cannot \nexonerate former Dr. president Rodrigo Duterte and his cohorts from their alleged crimes against humanity in connection with the past administration's war on drugs, according to Albay Rep. Edcel Lagman."
# # # # sentences = utils.sentence_segmentation(summary)
# # # print(predict_fake(summary))
# # print(clean_article(summary))
# # print(clean_text(summary))

# # link = 'https://www.tsek.ph/fact-check-p10000-incentive-to-those-who-will-register-for-national-id/'
# # print(predict_url(link))


# # def predict_sentences(sentences):
# #     sentences_values = []
# #     for i, sentence in enumerate(sentences):
# #         prediction = utils.predict_fake(sentence)
# #         max_score = utils.max_score(prediction[1])
# #         print(max_score)
# #         sentences_values.append({'id': i, 'verdict': prediction[0], 'sentence': sentence, 'score':max_score})
# #     return sentences_values


# # sentences = utils.sentence_segmentation(summary)
# # print(predict_sentences(sentences))

# # scrape = utils.scrape_tweet('Elon, Musk, Tesla, Twitter, SpaceX')
# # print('scrape ',scrape)

# import snscrape
# # snscrape module
# import snscrape.modules.twitter as twitterScraper
# import json

# # def scrape_tweets_replies_network(keyword):
# #     tweets = []
# #     replies = []
# #     query = keyword.replace(',', ' OR ')
# #     print('query: ',query)
# #     scraper = twitterScraper.TwitterSearchScraper(query)
# #     for i, tweet in enumerate(scraper.get_items()):
# #         if i > 10:
# #               break
# #         if tweet.in_reply_to_status_id is not None:
# #             replies.append(tweet)
# #         else:
# #             tweets.append(tweet)
            
# #     # Create the nodes and edges lists
# #     nodes = []
# #     edges = []
# #     print('tweets',tweets)
# #     print('replies',replies)
    
# #     # Add the tweets as nodes
# #     for tweet in tweets:
# #         nodes.append({"id": tweet.id, "label": tweet.username, "title": tweet.text})
        
# #     # Add the replies as nodes
# #     for reply in replies:
# #         nodes.append({"id": reply.id, "label": reply.username, "title": reply.text})
        
# #     # Add edges between tweets and replies
# #     for tweet in tweets:
# #         for reply in replies:
# #             if reply.in_reply_to_status_id == tweet.id:
# #                 edges.append({"from": tweet.id, "to": reply.id})
                
# #     # Create the data object
# #     data = {"nodes": nodes, "edges": edges}

# #     return data


# # print(scrape_tweets_replies_network("Elon, Musk, Tesla, Twitter, SpaceX"))
# # import random
# # import snscrape.modules.twitter as twitterScraper
# # def hex_code_colors():
# #     a = hex(random.randrange(0, 256))
# #     b = hex(random.randrange(0, 256))
# #     c = hex(random.randrange(0, 256))
# #     a = a[2:]
# #     b = b[2:]
# #     c = c[2:]
# #     if len(a) < 2:
# #         a = "0" + a
# #     if len(b) < 2:
# #         b = "0" + b
# #     if len(c) < 2:
# #         c = "0" + c
# #     z = a + b + c
# #     return "#" + z.upper()


# # def scrape_tweets_replies_network(keyword):
# #     tweets = []
# #     replies = []
# #     query = keyword.replace(',', ' OR ')
# #     print('query: ',query)
# #     scraper = twitterScraper.TwitterSearchScraper(query)
# #     for i, tweet in enumerate(scraper.get_items()):
# #         print(i,' ',tweet.id ,' : Reply to ',tweet.inReplyToTweetId)
# #         if i > 3:
# #               break
# #         if tweet.inReplyToTweetId is not None:
# #             replies.append(tweet)
# #             tweets.append(tweet.inReplyToTweetId)
# #         else:
# #             tweets.append(tweet.id)
            
# #     # Create the nodes and edges lists
# #     nodes = []
# #     edges = []
# #     id_counter = 0
    
# #     if id_counter == 0:
# #       nodes.append({"id": id_counter, "twitter_id": '0000', 'reply_to': None, "label": "News", "title":"News", "color": "#000000"})
# #       id_counter += 1
# #     # Add the tweets as nodes
# #     for tweet in tweets:
# #         color = hex_code_colors()
# #         nodes.append({"id": id_counter, "twitter_id": tweet, 'reply_to': None, "label": f"tweet {i}", "color": color,})
# #         id_counter += 1
        
# #     # Add the replies as nodes
# #     for reply in replies:
# #         color = hex_code_colors()
# #         nodes.append({"id": id_counter, "twitter_id": reply.id, 'reply_to': reply.inReplyToTweetId ,"label": f"reply {i}", "color": color,})
# #         id_counter += 1
    
# #     # Add edges between tweets and replies
# #     for tweet in nodes:
# #         is_connected = False
# #         for reply in nodes:
# #             if reply['reply_to'] == tweet['twitter_id'] and reply['reply_to'] is not None:
# #                 edges.append({"from": tweet['id'], "to": reply['id']})
# #                 is_connected = True
# #         if not is_connected:
# #             edges.append({"from": tweet['id'], "to": nodes[0]["id"]})
                
# #     # Create the data object
# #     data = {"nodes": nodes, "edges": edges}
    
# #     return data

# # # Usage
# # scrapes = scrape_tweets_replies_network("Elon, Musk, Tesla, Twitter, SpaceX")

# # print(scrapes)

# # print('Nodes',scrapes['nodes'])

# # print('Edges ',scrapes['edges'])

# # predict = utils.predict_url("https://www.nytimes.com/2020/07/10/world/asia/philippines-congress-media-duterte-abs-cbn.html")
# # print(predict)
# # print('predict:',predict[1])
# # print('predict:',predict[1][0])
# # print('predict:',predict[1][1])

# from sklearn.feature_extraction.text import TfidfVectorizer
# from nltk.corpus import stopwords
# import pickle
# with open(r'api\pickle_models\models\SVM_model.pkl', 'rb') as f:
#     svm_Fod_Model = pickle.load(f)

# def get_truthometer_features(article, model):
#     # Remove stop words from the article
#     stop_words = set(stopwords.words('english'))
#     words = article.split()
#     words = [word.lower() for word in words if word.lower() not in stop_words]
#     article = ' '.join(words)

#     # Convert the article to a feature vector using TF-IDF vectorization
#     vectorizer = TfidfVectorizer(stop_words='english')
#     X = vectorizer.fit_transform([article])

#     # Extract the feature names and log probabilities from the model
#     feature_names = vectorizer.get_feature_names()
#     log_probs = model.feature_log_prob_

#     # Sort the feature names and log probabilities by probability
#     sorted_probs = sorted(zip(log_probs[0], feature_names))

#     # Extract the top features associated with each Truth-O-Meter rating
#     truthometer_features = {'true': [], 'mostly_true': [], 'half_true': [], 'mostly_false': [], 'false': [], 'pants_on_fire': []}
#     for log_prob, feature_name in sorted_probs:
#         if log_prob == log_probs.max(axis=0)[0]:
#             truthometer_features['pants_on_fire'].append(feature_name)
#         elif log_prob >= log_probs.mean():
#             truthometer_features['false'].append(feature_name)
#         elif log_prob >= log_probs.min(axis=0)[0]:
#             truthometer_features['mostly_false'].append(feature_name)
#         elif log_prob >= log_probs.min(axis=0)[1]:
#             truthometer_features['half_true'].append(feature_name)
#         elif log_prob >= log_probs.min(axis=0)[2]:
#             truthometer_features['mostly_true'].append(feature_name)
#         else:
#             truthometer_features['true'].append(feature_name)
    
#     # Return the top features for each Truth-O-Meter rating
#     return truthometer_features


# # Get the Truth-O-Meter features for a news article
# article = "Donald Trump claims he won the 2020 presidential election as a from the we you"
# features = get_truthometer_features(article, svm_Fod_Model)

# # Print the top features for each Truth-O-Meter rating
# print("Features Naive Bayes:", features)
# print("Features associated with true articles:", features['true'])
# print("Features associated with mostly true articles:", features['mostly_true'])
# print("Features associated with half true articles:", features['half_true'])
# print("Features associated with mostly false articles:", features['mostly_false'])
# print("Features associated with false articles:", features['false'])
# print("Features associated with pants on fire articles:", features['pants_on_fire'])

# from sklearn.feature_extraction.text import TfidfVectorizer
# import pickle
# import nltk
# from nltk.corpus import stopwords

# nltk.download('stopwords')
# stop_words = set(stopwords.words('english'))
# import numpy as np

# with open(r'api\pickle_models\FOD\FOD2_svm.pkl', 'rb') as f:
#     svm_Fod_Model2 = pickle.load(f)

# def get_truthometer_features(article):
#     # Convert the article to a feature vector using TF-IDF vectorization
#     vectorizer = TfidfVectorizer(stop_words=stop_words)
#     X = vectorizer.fit_transform([article])

#     # Extract the feature names and weights from the model
#     feature_names = vectorizer.get_feature_names()
#     weights = svm_Fod_Model2.coef_[0]

#     # Sort the feature names and weights by weight
#     sorted_weights = sorted(zip(weights, feature_names))
#     print('sorted_weights',sorted_weights)
#     for weight, feature_name in sorted_weights:
#         print(": feature" ,weight)

#     # Extract the top features associated with each Truth-O-Meter rating
#     truthometer_features = {'true': [], 'mostly_true': [], 'half_true': [], 'mostly_false': [], 'false': [], 'pants_on_fire': []}
#     # for weight, feature_name in sorted_weights:
#     #     if isinstance(weight, np.ndarray):
#     #         if (weight > 1).all():
#     #             truthometer_features['true'].append(feature_name)
#     #         elif (weight > 0).all():
#     #             truthometer_features['mostly_true'].append(feature_name)
#     #         elif (weight > -1).all():
#     #             truthometer_features['half_true'].append(feature_name)
#     #         elif (weight > -2).all():
#     #             truthometer_features['mostly_false'].append(feature_name)
#     #         elif (weight > -3).all():
#     #             truthometer_features['false'].append(feature_name)
#     #         else:
#     #             truthometer_features['pants_on_fire'].append(feature_name)
#     #     else:
#     #         if weight > 1:
#     #             truthometer_features['true'].append(feature_name)
#     #         elif weight > 0:
#     #             truthometer_features['mostly_true'].append(feature_name)
#     #         elif weight > -1:
#     #             truthometer_features['half_true'].append(feature_name)
#     #         elif weight > -2:
#     #             truthometer_features['mostly_false'].append(feature_name)
#     #         elif weight > -3:
#     #             truthometer_features['false'].append(feature_name)
#     #         else:
#     #             truthometer_features['pants_on_fire'].append(feature_name)
    
#     # Return the top features for each Truth-O-Meter rating
#     return truthometer_features


# # Get the Truth-O-Meter features for a news article
# article = "Donald Trump claims he won the 2020 presidential election"
# features = get_truthometer_features(article)

# # Print the top features for each Truth-O-Meter rating
# print("Features SVM:", features)
# print("Features associated with true articles:", features['true'])
# print("Features associated with mostly true articles:", features['mostly_true'])
# print("Features associated with half true articles:", features['half_true'])
# print("Features associated with mostly false articles:", features['mostly_false'])
# print("Features associated with false articles:", features['false'])
# print("Features associated with pants on fire articles:", features['pants_on_fire'])



# import utils


# text = "Donald Trump claims he won the 2020 presidential election as a from the we you"

# print(utils.predict_fake(text))