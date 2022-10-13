from django.db import models

import datetime


# class order(models.Model):
#     course = models.ForeignKey('Course',on_delete=models.CASCADE,blank=True,related_name="course")
#     like = models.ForeignKey('User',on_delete=models.CASCADE,blank=True,related_name="like11")
#     start_date = models.DateField(auto_now=True)
#     end_date = models.DateField(null=True,blank=True)


    # def save(self):
    #     self.end_date = self.start_date + datetime.timedelta(91)
    #     self.end_date.save()








class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0)  # cents
    file = models.FileField(upload_to="product_files/", blank=True, null=True)
    url = models.URLField()

    def __str__(self):
        return self.name
    
    def get_display_price(self):
        return "{0:.2f}".format(self.price / 100)





from distutils.command.upload import upload
from django.db import models
from django.contrib.auth.models import AbstractUser



class User(AbstractUser):
    email = models.EmailField(unique=True)
    is_tech = models.BooleanField(default=False)
    is_student = models.BooleanField(default=True)
    # is_email_verified = models.BooleanField(default=False)

    def __str__(self):
        return self.username




# from django.conf import settings
# user = settings.AUTH_USER_MODEL

# from django.contrib.auth import get_user_model

# User = get_user_model()

def home_img(instance,filename):
    imagename , extension = filename.split(".")
    return "services/%s.%s"%(instance.id,extension)

class Services(models.Model):
    title_ar = models.CharField(max_length=50)
    disc_ar = models.CharField(max_length=50)
    title_en = models.CharField(max_length=50)
    disc_en = models.CharField(max_length=50)
    image = models.ImageField(upload_to=home_img,null=True,blank=True)
    # content


class Home(models.Model):
    title_ar = models.CharField(max_length=100)
    disc_ar = models.CharField(max_length=200)
    title_en = models.CharField(max_length=100)
    disc_en = models.CharField(max_length=200)
    image = models.ImageField(upload_to=home_img,null=True,blank=True)





from django.utils.text import slugify
from .helpers import *

  
def course_img(instance,filename):
    imagename , extension = filename.split(".")
    return "course/%s.%s"%(instance.id,extension)

class Course(models.Model):
    title_ar = models.CharField(max_length=100)
    disc_ar = models.TextField(max_length=200)
    title_en = models.CharField(max_length=100)
    disc_en = models.TextField(max_length=200)
    image = models.ImageField(upload_to=course_img,null=True,blank=True)
    user = models.ForeignKey(User, related_name='course_owner', on_delete=models.CASCADE)
    category= models.ForeignKey('Category',on_delete=models.CASCADE,null=True,blank=True)
    date = models.DateField(auto_now=True)
    slug = models.SlugField(blank=True,null=True)
    like = models.ManyToManyField(User,blank=True,related_name="like1")
    name = models.CharField(max_length=100)
    price = models.IntegerField(default=0)  # cents
    file = models.FileField(upload_to="product_files/", blank=True, null=True)
    url = models.URLField()

    def __str__(self):
        return self.name
    
    def get_display_price(self):
        return "{0:.2f}".format(self.price / 100)


  
    
    def save(self,*args, **kwargs):
        self.slug = slugify(self.title_en)
        super(Course,self).save(*args, **kwargs)



def category_img(instance,filename):
    imagename , extension = filename.split(".")
    return "category/%s.%s"%(instance.id,extension)

class Category(models.Model):
    title_ar = models.CharField(max_length=70)
    title_en = models.CharField(max_length=70)
    image = models.ImageField(upload_to=category_img)
    
    def __str__(self):
        return self.title_ar








 
    
def video(instance,filename):
    imagename , extension = filename.split(".")
    return "course/video/%s.%s"%(instance.id,extension)

# def video_img(instance,filename):
#     imagename , extension = filename.split(".")
#     return "course/image/%s.%s"%(instance.id,extension)

def code(instance,filename):
    imagename , extension = filename.split(".")
    return "course/code/%s.%s"%(instance.id,extension)

class Video(models.Model):
    title_ar = models.CharField(max_length=150)
    title_en = models.CharField(max_length=150)
    video=models.FileField(upload_to=video)
    code = models.FileField(upload_to=code,blank=True,null=True)
    course = models.ForeignKey(Course,on_delete=models.CASCADE,blank=True,null=True)
    
    user = models.ForeignKey(User,on_delete=models.CASCADE)
    
    def __str__(self):
        return str(self.course)  + self.title_ar



class Profile(models.Model):
    title_ar = models.CharField(max_length=50)
    disc_ar = models.CharField(max_length=50)
    title_en = models.CharField(max_length=50)
    disc_en = models.CharField(max_length=50)
    image = models.ImageField(upload_to=home_img,null=True,blank=True)
    user = models.OneToOneField(User,on_delete=models.CASCADE,null=True, blank=True)
    like = models.ManyToManyField(User,blank=True,related_name="like2")


from django.dispatch import receiver
from django.db.models.signals import post_save

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance,title_ar='your name',title_en='الاسم',disc_ar='المهنة',disc_en='your work',image='product_files/teacher-5.png')


from froala_editor.fields import FroalaField

class BlogModel(models.Model):
    title_ar = models.CharField(max_length=350)
    disc_ar = models.CharField(max_length=200,null=True,blank=True)
    title_en = models.CharField(max_length=350)
    disc_en = models.CharField(max_length=200,null=True,blank=True)
    content = FroalaField()
    content2 = models.TextField()
    slug = models.SlugField(max_length=1000 , null=True , blank=True)
    user = models.ForeignKey(User, blank=True , null=True , on_delete=models.CASCADE)
    image = models.ImageField(upload_to='media/blog',null=True,blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    upload_to = models.DateTimeField(auto_now=True)
    course = models.ForeignKey('Course',on_delete=models.CASCADE,null=True,blank=True)
    # vid_num = models.IntegerField(null=True,blank=True)
    is_serv = models.BooleanField(default=False)
    is_blog = models.BooleanField(default=False)
    blog_Category = models.ForeignKey('blog_Category',on_delete=models.CASCADE,null=True,blank=True)
    is_project = models.BooleanField(default=False)
    project_Category = models.ForeignKey('Project_Category',on_delete=models.CASCADE,null=True,blank=True)
    like = models.ManyToManyField(User,blank=True,related_name="like3")
    # user_slug = models.SlugField(max_length=1000 , null=True , blank=True)
    # course_category = models.ForeignKey('Category',on_delete=models.PROTECT,blank=True,null=True)
    # like = models.ManyToManyField(settings.AUTH_USER_MODEL,blank=True,related_name="like1")
    def __str__(self):
        return self.title_en
    
    # def save(self , *args, **kwargs): 
    #     self.slug = generate_slug(self.title_en)
    #     super(BlogModel, self).save(*args, **kwargs)
        
    



def blog_category_img(instance,filename):
    imagename , extension = filename.split(".")
    return "category/%s.%s"%(instance.id,extension)

class blog_Category(models.Model):
    title_ar = models.CharField(max_length=50)
    title_en = models.CharField(max_length=50)
    image = models.ImageField(upload_to=category_img)
    
    
    def __str__(self):
        return self.title_en
    



class Project_Category(models.Model):
    title_ar = models.CharField(max_length=350)
    title_en = models.CharField(max_length=350)
    image = models.ImageField(upload_to='images/procat')
    user = models.ForeignKey(User, blank=True , null=True , on_delete=models.CASCADE) 
    # slug = models.SlugField(max_length=1000 , null=True , blank=True)
    
    # def save(self , *args, **kwargs): 
    #     self.slug = generate_slug(self.title_en)
    #     super(Project_Category, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.title_en




    
    
class Contact(models.Model):
    phone = models.IntegerField()
    email = models.EmailField()
    address_ar = models.CharField(max_length=200)
    address_en = models.CharField(max_length=200)
    map = models.URLField()
    
    def __str__(self):
        return self.email
    