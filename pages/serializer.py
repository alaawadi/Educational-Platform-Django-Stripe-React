# from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from .models import *


# from django.conf import settings
# user = settings.AUTH_USER_MODEL

# User Serializer
class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'


class UserSerializer2(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('username','email','is_tech','is_student')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
  password = serializers.CharField(min_length=8)
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

    return user



class ServicesSerializer(serializers.ModelSerializer):
  class Meta:
    model = Services
    fields = '__all__'





class CourseSerializer(serializers.ModelSerializer):
  class Meta:
    model = Course
    fields = '__all__'





class CourseSerializer2(serializers.ModelSerializer):
  class Meta:
    model = Course
    fields = ['id','title_ar',"title_en","disc_ar","disc_en",'user','image']





class HomeSerializer(serializers.ModelSerializer):
  class Meta:
    model = Home
    fields = '__all__'



class VideoSerializer(serializers.ModelSerializer):
  class Meta:
    model = Video
    fields = '__all__'



class ProfileSerializer(serializers.ModelSerializer):
  class Meta:
    model = Profile
    fields = '__all__'




class BlogModelSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogModel
    fields = '__all__'








class BlogModel2Serializer(serializers.ModelSerializer):
  class Meta:
    model = BlogModel
    fields = ['title_ar','title_en','disc_ar','disc_en','content','content2','user','is_serv','is_blog','is_project','image']





class ContactSerializer(serializers.ModelSerializer):
  class Meta:
    model = Contact
    fields = '__all__'



class LikeSerializer(serializers.ModelSerializer):
  class Meta:
    model = BlogModel
    fields = ['Like']



class ChangePasswordSerializer(serializers.Serializer):
    model = User
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
