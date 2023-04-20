from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
#AbstractUser automatic creating model and add some fields for the User
# # Ex. username, password, email, firstname,lastname and etc.
class User(AbstractUser):
  pictures = models.ImageField(null=True, blank = True, upload_to = "profile/")
  facebook = models.CharField(max_length = 500,null=True,  blank=True)
  instagram = models.CharField(max_length = 500,null=True,  blank=True)
  twitter = models.CharField(max_length = 500,null=True,  blank=True)
  gender = models.CharField(max_length = 500,null=True,  blank=True)
  contact_no = models.CharField(max_length = 500,null=True,  blank=True)
  b_day = models.CharField(max_length = 500,null=True,  blank=True)


class Sentiment(models.Model):
    sentiment = models.CharField(max_length=600,null=True, blank=True, default=None)
    sentiment_pos = models.CharField(max_length=600,null=True, blank=True, default=None)
    sentiment_neg = models.CharField(max_length=600,null=True, blank=True, default=None)
    sentiment_nuetral = models.CharField(max_length=600,null=True, blank=True, default=None)
    
class Linguistic(models.Model):

    lang = models.CharField(max_length=600,null=True, blank=True, default=None)
    uppercase_count = models.CharField(max_length=600,null=True, blank=True, default=None)
    lowercase_count = models.CharField(max_length=600,null=True, blank=True, default=None)
    num_counts = models.CharField(max_length=600,null=True, blank=True, default=None)
    at_count = models.CharField(max_length=600,null=True, blank=True, default=None)
    question_count = models.CharField(max_length=600,null=True, blank=True, default=None)
    slash_count = models.CharField(max_length=600,null=True, blank=True, default=None)
    hashtag_count = models.CharField(max_length=600,null=True, blank=True, default=None)
    word_count = models.CharField(max_length=600,null=True, blank=True, default=None)
    char_count = models.CharField(max_length=600,null=True, blank=True, default=None)
    sentence_count = models.CharField(max_length=600,null=True, blank=True, default=None)
    avg_word_length = models.CharField(max_length=600,null=True, blank=True, default=None)
    avg_sentence_length = models.CharField(max_length=600,null=True, blank=True, default=None)


#make model for history and inputs like PDF docs etc. 
class NewsPrediction(models.Model):
    #default = None means that it will store none if the user decides not to fill the data.
    author = models.ForeignKey(User, on_delete=models.CASCADE,related_name="author",null=True, blank=True, default=None)

    #News details
    feature = models.CharField(max_length=100,null=True,  blank=True)
    headlines = models.CharField(max_length=100,null=True,  blank=True)
    summary = models.CharField(max_length=500,null=True,  blank=True)
    news_img = models.CharField(max_length=500,null=True,  blank=True)
    news_link = models.CharField(max_length = 500,null=True,  blank=True)
    date = models.CharField(max_length = 500,null=True,  blank=True)
    keywords = models.CharField(max_length = 500,null=True,  blank=True)
    authors = models.CharField(max_length = 500,null=True,  blank=True)

    #machine learning outputs
    verdict = models.CharField(max_length=100,null=True,  blank=True)
    fuzzy_store = models.CharField(max_length = 500,null=True,  blank=True)

    #news reports
    reason = models.CharField(max_length = 500,null=True,  blank=True)
    sentiment = models.ForeignKey(Sentiment, on_delete=models.CASCADE, related_name="sentiment_analysis",null=True, blank=True, default=None)
    linguistic = models.ForeignKey(Linguistic, on_delete=models.CASCADE, related_name="linguistic_analysis",null=True, blank=True, default=None)


    file = models.FileField(null=True, blank = True, upload_to = "files/")

    #auto_now_add = a start date you first add a listings
    created_at = models.DateTimeField(auto_now_add=True)
    #auto_now = the date when you modifed/update a listings
    update_at = models.DateTimeField(auto_now=True)
    


class Comments(models.Model):
    #commentor is basically the user that logged in it is link to the User model/table
    commentor = models.ForeignKey(User, on_delete=models.CASCADE,related_name="commentor" ,null=True, blank=True, default="Guest")
    #article is the articles in NewsPrediction
    article= models.ForeignKey(NewsPrediction, on_delete=models.CASCADE, related_name="comments",null=True, blank=True, default=None)
    #text is the comments/message of the commentor/user.
    text = models.CharField(max_length=600,null=True, blank=True, default=None)
    #time when the comment was add
    comment_at = models.DateTimeField(auto_now_add=True)
    #auto_now = the date when you modifed/update a listings
    update_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.commentor.username} : {self.text}" 