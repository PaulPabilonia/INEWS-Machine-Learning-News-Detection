from django.urls import path
from . import views
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
  path('prediction/',views.PredictionList.as_view()),
  path('prediction/<int:pk>', views.PredictionDetail.as_view()),
  path("get-details/",views.UserDetailAPI.as_view()),
  path('register/',views.RegisterUserAPIView.as_view()),
  path('userLists/',views.UserListAPIView.as_view()),
  path('userDetails/<int:pk>', views.UserDetail.as_view()),
  path('comment/', views.AddComment.as_view()),
  path('login/', obtain_auth_token, name='login'),
  path('sentiments/',views.SentimentAPIView.as_view()),
  path('linguistics/',views.LinguisticAPIView.as_view()),
  path('news-search/', views.NewsSearch.as_view(), name='news_search'),
]