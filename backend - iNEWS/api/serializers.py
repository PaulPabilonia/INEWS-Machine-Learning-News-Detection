from rest_framework import serializers
from rest_framework.response import Response
from rest_framework import status
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

from rest_framework.authtoken.models import Token
from fakenews.models import NewsPrediction, Comments,User,Sentiment,Linguistic, ManualCheck, Sentence


# Serializer to Get User Details using Django Token Authentication
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'password', 'last_login' ,'is_superuser' ,'username' ,'first_name' ,'last_name' ,'email' ,'is_staff'
        ,'is_active','date_joined','pictures','facebook','instagram','twitter','groups','user_permissions','gender','contact_no','b_day']

class CommentsSerializers(serializers.ModelSerializer):
    commentor = UserSerializer(many=False, read_only=True)

    class Meta:
        model = Comments
        fields = '__all__'

class SentimentSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sentiment
        fields = '__all__'

class LinguisticSerializers(serializers.ModelSerializer):
    class Meta:
        model = Linguistic
        fields = '__all__'

class NewsPredictionSerializers(serializers.ModelSerializer):
    author = UserSerializer(many=False, read_only=True)
    comments = CommentsSerializers(many=True, read_only=True)
    sentiment = SentimentSerializers(many=False, read_only=True)
    linguistic = LinguisticSerializers(many=False, read_only=True)
    class Meta:
        model = NewsPrediction
        fields = ['id', 'feature', 'headlines' ,'summary' ,'news_img' ,'news_link' ,'date' ,'keywords' ,'authors'
        ,'verdict','fuzzy_store','reason','sentiment','linguistic','file','created_at','update_at','author','comments']




# Serializer to Register User
class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(required=True, validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2',
                  'email', 'first_name', 'last_name')
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'username': {'required': False}
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})
        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username =validated_data['email'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        
        return user

class SentenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sentence
        fields = ['id','verdict', 'sentence']

class ManualCheckSerializer(serializers.ModelSerializer):
    sentences = SentenceSerializer(many=True, required=False)
    news_prediction = NewsPredictionSerializers(many=False, read_only=True)

    class Meta:
        model = ManualCheck
        fields = ['id','verdict', 'evidence', 'sentences','news_prediction']

    def create(self, validated_data):
        sentences_data = validated_data.pop('sentences')
        manual_check = ManualCheck.objects.create(**validated_data)

        for sentence_data in sentences_data:
            Sentence.objects.create(manual_check=manual_check, **sentence_data)

        return manual_check