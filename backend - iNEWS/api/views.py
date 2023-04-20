from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from fakenews.models import NewsPrediction, User, Comments, Sentiment, Linguistic
from .serializers import NewsPredictionSerializers, UserSerializer, RegisterSerializer, CommentsSerializers, SentimentSerializers, LinguisticSerializers
from rest_framework import generics
from rest_framework import status
from rest_framework.parsers import MultiPartParser, JSONParser, FormParser, FileUploadParser
from . import utils
import datetime
import PyPDF2
from googlesearch import search

from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication

# Class based view to Get User Details using Token Authentication


class UserDetailAPI(generics.RetrieveUpdateDestroyAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def get(self, request, *args, **kwargs):
        print(self.request.user)
        user = User.objects.get(id=request.user.id)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        print(request.data)
        data_to_change = request.data
        # Partial update of the data
        serializer = self.serializer_class(request.user,data=data_to_change, partial=True)
        if serializer.is_valid():
            self.perform_update(serializer)

        return Response(serializer.data)

# Class based view to register user


class RegisterUserAPIView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset

# Class based view to register user


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserListAPIView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def get_queryset(self):
        queryset = User.objects.all()
        return queryset


class AddComment(generics.ListCreateAPIView):
    authentication_classes = (TokenAuthentication,)
    permission_classes = (AllowAny,)
    serializer_class = CommentsSerializers

    def get_queryset(self):
        queryset = Comments.objects.all().order_by('-comment_at')
        return queryset

    def post(self, request, *args, **kwargs):
        user = self.request.user  # get the user
        print('USER:', user)
        print("DATA:", self.request.data)
        # using the listing_id it will get the ShoppingList that we want to add some comment
        prediction = NewsPrediction.objects.get(
            pk=self.request.data['predictionID'])
        # this will create/save the new comment
        print(prediction)
        new_comment = Comments(
            commentor=user, article=prediction, text=self.request.data['comment'])
        new_comment.save()  # we need to save it to the data base for later reference
        serializer = CommentsSerializers(new_comment)
        return Response(serializer.data)


class PredictionList(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = NewsPredictionSerializers
    parser_classes = (JSONParser, MultiPartParser,
                      FormParser, FileUploadParser)

    def get_queryset(self):
        queryset = NewsPrediction.objects.all().order_by('-created_at')
        return queryset

    def post(self, request, *args, **kwargs):
        news_data = self.request.data
        print(self.request.data)
        datetimeInstance = datetime.datetime.today()
        user = self.request.user  # get the user
        print('USER:', user)
        print("DATA:", self.request.data)

        if user.is_authenticated:
            author = self.request.user
        else:
            author = None

        print(author)

        if news_data['feature'] == 'url':
            predict = utils.predict_url(news_data['news_link'])

            verdict = predict[1][0]
            fuzzy_scores = predict[1][1]
            scores = [str(i) for i in fuzzy_scores]
            fuzzy_store = ", ".join(scores)
            print(fuzzy_store)

            summary = predict[2]

            sentiment = utils.get_sentiment(summary)
            linguistic = utils.get_linguistic(summary)

            sentiment_analysis = Sentiment(
                sentiment=sentiment['sentiment'],
                sentiment_pos=sentiment['sentiment_pos'],
                sentiment_neg=sentiment['sentiment_neg'],
                sentiment_nuetral=sentiment['sentiment_neu']
            )
            sentiment_analysis.save()

            print(sentiment_analysis)

            linguistic_analysis = Linguistic(
                lang=linguistic['lang'],
                uppercase_count=linguistic['uppercase_count'],
                lowercase_count=linguistic['lowercase_count'],
                num_counts=linguistic['num_counts'],
                at_count=linguistic['at_count'],
                question_count=linguistic['question_count'],
                slash_count=linguistic['slash_count'],
                hashtag_count=linguistic['hashtag_count'],
                char_count=linguistic['char_count'],
                word_count=linguistic['word_count'],
                sentence_count=linguistic['sentence_count'],
                avg_word_length=linguistic['avg_word_length'],
                avg_sentence_length=linguistic['avg_sentence_lenght']
            )
            linguistic_analysis.save()

            headline = predict[0]
            news_img = predict[3]
            author_list = predict[4]
            date = predict[5]
            keywords_list = predict[6]

            authors = ', '.join(author_list)
            keywords = ', '.join(keywords_list)
            new_prediction = NewsPrediction.objects.create(
                author=author,
                feature=news_data['feature'],
                headlines=headline,
                summary=summary,
                news_img=news_img,
                news_link=news_data['news_link'],
                date=date,
                keywords=keywords,
                authors=authors,
                verdict=verdict,
                fuzzy_store=fuzzy_store,
                sentiment=sentiment_analysis,
                linguistic=linguistic_analysis
            )
        elif news_data['feature'] == 'text':
            sentiment = utils.get_sentiment(self.request.data['summary'])
            linguistic = utils.get_linguistic(self.request.data['summary'])

            print(sentiment['sentiment_neu'])
            sentiment_analysis = Sentiment(
                sentiment=sentiment['sentiment'],
                sentiment_pos=sentiment['sentiment_pos'],
                sentiment_neg=sentiment['sentiment_neg'],
                sentiment_nuetral=sentiment['sentiment_neu']
            )
            sentiment_analysis.save()

            print(sentiment_analysis)

            linguistic_analysis = Linguistic(
                lang=linguistic['lang'],
                uppercase_count=linguistic['uppercase_count'],
                lowercase_count=linguistic['lowercase_count'],
                num_counts=linguistic['num_counts'],
                at_count=linguistic['at_count'],
                question_count=linguistic['question_count'],
                slash_count=linguistic['slash_count'],
                hashtag_count=linguistic['hashtag_count'],
                char_count=linguistic['char_count'],
                word_count=linguistic['word_count'],
                sentence_count=linguistic['sentence_count'],
                avg_word_length=linguistic['avg_word_length'],
                avg_sentence_length=linguistic['avg_sentence_lenght']
            )
            linguistic_analysis.save()

            predict = utils.predict_fake(news_data['headlines'] + ' ' + news_data['summary'])
            fuzzy_scores = predict[1]
            scores = [str(i) for i in fuzzy_scores]
            fuzzy_store = ", ".join(scores)
            keywords = utils.get_keywords(
                news_data['headlines'] + ' ' + news_data['summary'])
            new_prediction = NewsPrediction.objects.create(
                author=author,
                feature=news_data['feature'],
                headlines=news_data['headlines'],
                summary=news_data['summary'],
                date=datetimeInstance.date(),
                keywords=keywords,
                authors=news_data['authors'],
                verdict=predict[0],
                fuzzy_store=fuzzy_store,
                sentiment=sentiment_analysis,
                linguistic=linguistic_analysis,
            )

        elif news_data['feature'] == 'document':
            text = news_data['file']
            reader = PyPDF2.PdfFileReader(text)
            info = reader.getDocumentInfo()
            headline = info['/Title']
            ext = utils.extract_and_clean_text(text)

            sentiment = utils.get_sentiment(ext)
            linguistic = utils.get_linguistic(ext)

            sentiment_analysis = Sentiment(
                sentiment=sentiment['sentiment'],
                sentiment_pos=sentiment['sentiment_pos'],
                sentiment_neg=sentiment['sentiment_neg'],
                sentiment_nuetral=sentiment['sentiment_neu']
            )
            sentiment_analysis.save()

            print(sentiment_analysis)

            linguistic_analysis = Linguistic(
                lang=linguistic['lang'],
                uppercase_count=linguistic['uppercase_count'],
                lowercase_count=linguistic['lowercase_count'],
                num_counts=linguistic['num_counts'],
                at_count=linguistic['at_count'],
                question_count=linguistic['question_count'],
                slash_count=linguistic['slash_count'],
                hashtag_count=linguistic['hashtag_count'],
                char_count=linguistic['char_count'],
                word_count=linguistic['word_count'],
                sentence_count=linguistic['sentence_count'],
                avg_word_length=linguistic['avg_word_length'],
                avg_sentence_length=linguistic['avg_sentence_lenght']
            )
            linguistic_analysis.save()

            predict = utils.predict_fake(ext)
            fuzzy_scores = predict[1]
            scores = [str(i) for i in fuzzy_scores]
            fuzzy_store = ", ".join(scores)

            keywords = utils.get_keywords(ext)

            new_prediction = NewsPrediction.objects.create(
                author=author,
                feature=news_data['feature'],
                headlines=headline,
                summary=ext,
                date=datetimeInstance.date(),
                keywords=keywords,
                authors=news_data['authors'],
                verdict=predict[0],
                fuzzy_store=fuzzy_store,
                sentiment=sentiment_analysis,
                linguistic=linguistic_analysis,
                file=news_data['file']
            )

        new_prediction.save()

        serializer = NewsPredictionSerializers(new_prediction)
        return Response(serializer.data)


class PredictionDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = (AllowAny,)
    serializer_class = NewsPredictionSerializers

    def get(self, request, *args, **kwargs):
        print(self.kwargs)
        pk = self.kwargs.get('pk')
        queryset = NewsPrediction.objects.get(pk=pk)
        print(queryset.headlines)
        news_urls = utils.search_news(queryset.headlines)
        related_news = utils.news_details(news_urls)
        related_tweets = utils.scrape_tweets_replies_network(queryset.keywords)

        summary = utils.sentence_segmentation(queryset.summary)
        sentences = utils.predict_sentences(summary)

        print('News',related_news)
        print('Tweets',related_tweets)
        serializer = NewsPredictionSerializers(queryset)

        data = {
            'prediction': serializer.data,
            'related_news': related_news,
            'graph': related_tweets,
            'sentences': sentences
        }
        return Response(data)


class SentimentAPIView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = SentimentSerializers

    def get_queryset(self):
        queryset = Sentiment.objects.all()
        return queryset


class LinguisticAPIView(generics.ListCreateAPIView):
    permission_classes = (AllowAny,)
    serializer_class = LinguisticSerializers

    def get_queryset(self):
        queryset = Linguistic.objects.all()
        return queryset
    
class NewsSearch(APIView):
    permission_classes = (AllowAny,)
    def get(self, request):
        query = request.query_params.get('query', None)
        print('query', query)
        if query:
            urls = []
            search_query = "News about " + query
            print("search_query: ", search_query)
            for i in search(search_query, tld="co.in", num=5, stop=5, pause=10):
                urls.append(i)
            print(urls)
            return Response(urls)
        else:
            return Response({'error': 'No query parameter provided.'})