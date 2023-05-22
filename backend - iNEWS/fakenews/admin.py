from django.contrib import admin
from .models import NewsPrediction, Comments, User, Sentiment, Linguistic, Sentence, ManualCheck
# Register your models here.

admin.site.register(NewsPrediction)
admin.site.register(Comments)
admin.site.register(User)
admin.site.register(Sentiment)
admin.site.register(Linguistic)
admin.site.register(Sentence)
admin.site.register(ManualCheck)

