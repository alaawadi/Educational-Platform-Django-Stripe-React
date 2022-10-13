


import json
from urllib import request
import stripe
from django.core.mail import send_mail
from django.conf import settings
from django.views.generic import TemplateView
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse, HttpResponse
from django.views import View
from .models import Product


stripe.api_key = settings.STRIPE_SECRET_KEY


class SuccessView(TemplateView):
    template_name = "success.html"


class CancelView(TemplateView):
    template_name = "cancel.html"

# from .models import cou
class ProductLandingPageView(TemplateView):
    template_name = "landing.html"
    
    def get_context_data(self, **kwargs):
        product_id = self.kwargs["id"]
        product = Course.objects.get(id=product_id)
        context = super(ProductLandingPageView, self).get_context_data(**kwargs)
        context.update({
            "product": product,
            "STRIPE_PUBLIC_KEY": settings.STRIPE_PUBLIC_KEY
        })
        return context


class CreateCheckoutSessionView(View):
    def post(self, request, *args, **kwargs):
        product_id = self.kwargs["pk"]
        product = Course.objects.get(id=product_id)
        YOUR_DOMAIN = "http://127.0.0.1:8000"
        checkout_session = stripe.checkout.Session.create(
            payment_method_types=['card'],
            line_items=[
                {
                    'price_data': {
                        'currency': 'usd',
                        'unit_amount': product.price,
                        'product_data': {
                            'name': product.name,
                            # 'images': ['https://i.imgur.com/EHyR2nP.png'],
                        },
                    },
                    'quantity': 1,
                },
            ],
            metadata={
                "product_id": product.id
            },
            mode='payment',
            success_url=YOUR_DOMAIN + '/success/',
            cancel_url=YOUR_DOMAIN + '/cancel/',
        )
        
        return JsonResponse({
            'id': checkout_session.id
        })
    

@csrf_exempt
def stripe_webhook(request):
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try:
        event = stripe.Webhook.construct_event(
            payload, sig_header, settings.STRIPE_WEBHOOK_SECRET
        )
    except ValueError as e:
        # Invalid payload
        return HttpResponse(status=400)
    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)

    # Handle the checkout.session.completed event
    if event['type'] == 'checkout.session.completed':
        session = event['data']['object']

        # customer_email = session["customer_details"]["email"]
        customer_email = "alaawadi98@gamil.com"
        product_id = session["metadata"]["product_id"]

        product = Course.objects.get(id=product_id)

        send_mail(
            subject="Here is your product",
            message=f"Thanks for your purchase. Here is the product you ordered. The URL is {product.url}",
            recipient_list=[customer_email],
            from_email="matt@test.com"
        )

        # TODO - decide whether you want to send the file or the URL
    
    elif event["type"] == "payment_intent.succeeded":
        intent = event['data']['object']

        stripe_customer_id = intent["customer"]
        stripe_customer = stripe.Customer.retrieve(stripe_customer_id)

        customer_email = stripe_customer['email']
        product_id = intent["metadata"]["product_id"]

        product = Course.objects.get(id=product_id)

        send_mail(
            subject="Here is your product",
            message=f"Thanks for your purchase. Here is the product you ordered. The URL is {product.url}",
            recipient_list=[customer_email],
            from_email="matt@test.com"
        )

    return HttpResponse(status=200)


class StripeIntentView(View):
    def post(self, request, *args, **kwargs):
        try:
            req_json = json.loads(request.body)
            customer = stripe.Customer.create(email=req_json['email'])
            product_id = self.kwargs["pk"]
            product = Course.objects.get(id=product_id)
            intent = stripe.PaymentIntent.create(
                amount=product.price,
                currency='usd',
                customer=customer['id'],
                metadata={
                    "product_id": product.id
                }
            )
        

            return JsonResponse({
                'clientSecret': intent['client_secret']
            })            
        except Exception as e:
            return JsonResponse({ 'error': str(e) })






# import matplotlib.pyplot as plt

# def chart(request):
#     # x axis values
#     x = [1,2,3,4,5,6]
#     # corresponding y axis values
#     y = [2,4,1,5,2,6]

#     # plotting the points
#     plt.plot(x, y, color='green', linestyle='dashed', linewidth = 3,
#             marker='o', markerfacecolor='blue', markersize=12)

#     # setting x and y axis range
#     plt.ylim(1,8)
#     plt.xlim(1,8)

#     # naming the x axis
#     plt.xlabel('x - axis')
#     # naming the y axis
#     plt.ylabel('y - axis')

#     # giving a title to my graph
#     plt.title('Some cool customizations!')

#     # function to show the plot
#     plt.show()



import plotly.express as px
import plotly
from django.http import HttpResponse, JsonResponse

def chart2(request):

    df = px.data.stocks()
    fig = px.line(df, x='date', y="GOOG")
    # fig.show()
    graph_div = plotly.offline.plot(fig, auto_open = False, output_type="div")
    return JsonResponse({'x':graph_div})    


from .models import User

import datetime


def use(request):
    x = datetime.datetime.now()
    month3 = x - datetime.timedelta(91)
    month6 = x - datetime.timedelta(183)
    year = x - datetime.timedelta(365)
    # x.month = int(x.month) - 3
    # month6 = int(x.month) - 8
    # print(new_time)
    # all = User.objects.filter()
    month3x = User.objects.filter(date_joined__range=[month3, x])
    month6x = User.objects.filter(date_joined__range=[month6, x])
    yearx = User.objects.filter(date_joined__range=[year, x])
    

    return JsonResponse({"x3":month3x.count(),'x6':month6x.count(),'x12':yearx.count()})






def blog_count(request):
    x = datetime.datetime.now()
    month3 = x - datetime.timedelta(91)
    month6 = x - datetime.timedelta(183)
    year = x - datetime.timedelta(365)
    # x.month = int(x.month) - 3
    # month6 = int(x.month) - 8
    # print(new_time)
    # all = User.objects.filter()
    
    all = BlogModel.objects.filter(is_blog=True)
    numall = 0
    for v in all:
        numall += v.like.all().count()

    month3x = BlogModel.objects.filter(created_at__range=[month3, x])
    num = 0
    for v in month3x:

        num += v.like.all().count()

    month6x = BlogModel.objects.filter(created_at__range=[month6, x])
    num2 = 0
    for v in month6x:

        num2 += v.like.all().count()

    yearx = BlogModel.objects.filter(created_at__range=[year, x])
    num3 = 0
    for v in yearx:

        num3 += v.like.all().count()
    # month6x = User.objects.filter(created_at__range=[month6, x])
    # yearx = User.objects.filter(created_at__range=[year, x])
    

    return JsonResponse({"x3":num,'x6':num2,'x12':num3,'all':numall})






def project_count(request):
    x = datetime.datetime.now()
    month3 = x - datetime.timedelta(91)
    month6 = x - datetime.timedelta(183)
    year = x - datetime.timedelta(365)
    # x.month = int(x.month) - 3
    # month6 = int(x.month) - 8
    # print(new_time)
    # all = User.objects.filter()
    
    all = BlogModel.objects.filter(is_Project=True)
    numall = 0
    for v in all:
        numall += v.like.all().count()

    month3x = BlogModel.objects.filter(created_at__range=[month3, x])
    num = 0
    for v in month3x:

        num += v.like.all().count()

    month6x = BlogModel.objects.filter(created_at__range=[month6, x])
    num2 = 0
    for v in month6x:

        num2 += v.like.all().count()

    yearx = BlogModel.objects.filter(created_at__range=[year, x])
    num3 = 0
    for v in yearx:

        num3 += v.like.all().count()
    # month6x = User.objects.filter(created_at__range=[month6, x])
    # yearx = User.objects.filter(created_at__range=[year, x])
    

    return JsonResponse({"x3":num,'x6':num2,'x12':num3,'all':numall})












def course_count(request):
    x = datetime.datetime.now()

    
    all = Course.objects.all()
    numall = 0
    for v in all:
        numall += v.like.all().count()
    

    return JsonResponse({'all':numall})


from django.shortcuts import redirect, render
# from django.contrib.auth.models import User


def index(request):
    username = None
    email = None
    authenticated = False
    
    if request.user.is_authenticated:
        username = request.user.username
        email = request.user.email
        authenticated =True
    context = {
        'authenticated':authenticated,
        'username':username,
        'email':email
    }
    return render(request,'index.html',context)





from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework import permissions

from .models import BlogModel,Profile
from .serializer import BlogModelSerializer,ProfileSerializer

class BlogModelDetailView(RetrieveAPIView):
    queryset = BlogModel.objects.order_by('id')
    serializer_class = BlogModelSerializer
    lookup_field = 'id'
    permission_classes = (permissions.AllowAny, )



class ProfileDetailView(RetrieveAPIView):
    queryset = Profile.objects.order_by('id')
    serializer_class = ProfileSerializer
    lookup_field = 'id'
    permission_classes = (permissions.AllowAny, )



# from rest_framework.views import APIView
# from rest_framework.response import Response


# # from .serializers import RecommendationSerializer
# # from .models import Recommendation
# from api import serializers

# git item

# class BlogAPIView2(APIView):



#     def post(self, request, *args, **kwargs):
#         if request.data.get('title') != '':
#             serializer = LikeSerializer(data=request.data)
#             if serializer.is_valid():
#                 serializer.save()
#                 return Response({
#                 'success': True,
#                 'message': 'APIView: post request fulfilled',
#                 'data': serializer.data
#             })





from django.http import HttpResponse, JsonResponse
from .models import BlogModel

def like_dislike(request,id):
    obj = BlogModel.objects.filter(id=id).first()
    res = obj.like.all().count()
    print(res)
    if request.user in obj.like.all():
        obj.like.remove(request.user)
        return JsonResponse({'count':res})
    else:
        obj.like.add(request.user)

    return JsonResponse({'count':res})
    
from .models import Course

def like_dislike2(request,id):
    # x = datetime.datetime.now()
    # month3 = x + datetime.timedelta(91)
    # month6 = x + datetime.timedelta(183)
    # year = x + datetime.timedelta(365)
    obj = Course.objects.filter(id=id).first()
    res = obj.like.all().count()
    if request.user in obj.like.all():
        obj.like.remove(request.user)
        return JsonResponse({'count':res})
    else:
        obj.like.add(request.user)

    return Response({'count':res})
    





def is_authenticated(request):
    username = None
    email = None
    authenticated = False
    is_tech = False
    is_student = False
    admin = False
    id = None
    if request.user.is_authenticated:
        username = request.user.username
        email = request.user.email
        id = request.user.id
        is_tech = request.user.is_tech
        is_student = request.user.is_student
        authenticated =True
        admin = request.user.is_superuser
    user = {
        'authenticated':authenticated,
        'username':username,
        'email':email,
        'id':id,
        'is_tech':is_tech,
        'is_student':is_student,
        'is_admin': admin,

    }
    return JsonResponse(user)





from rest_framework import generics
from .serializer import RegisterSerializer
from rest_framework.response import Response


class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "status": "created sucssesfully"
    })




from rest_framework.decorators import api_view
from .models import *
from .serializer import *
from rest_framework.response import Response
# from django.contrib.auth.models import User



@api_view(['GET','POST'])
def All(request):
	recommendation = Services.objects.all().order_by('id')
	serializer = ServicesSerializer(recommendation, many=True).data
	serializer2 = ServicesSerializer(data=request.data)

	if serializer2.is_valid():
		serializer2.save()
	return Response(serializer)


@api_view(['GET'])
def users(request):
	recommendation = User.objects.all().order_by('-id')
	serializer = UserSerializer(recommendation, many=True).data
	

	
	return Response(serializer)

from rest_framework import mixins
from rest_framework import generics


class create_list(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Services.objects.all()
    serializer_class = ServicesSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


from .models import Course
from .serializer import CourseSerializer2

class create_list2(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer2

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)




class all_Courses(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)



class home_page(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Home.objects.all()
    serializer_class = HomeSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)






class video_page(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Video.objects.all()
    serializer_class =  VideoSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)







class Profile_page(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Profile.objects.all()
    serializer_class =  ProfileSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


from rest_framework.decorators import api_view
# from .models import Item
# from .serializers import ,UserSerializer
from rest_framework.response import Response
# from django.contrib.auth.models import User


@api_view(['GET','POST'])
def user_profile(request):
	recommendation = Profile.objects.all()
	serializer = ProfileSerializer(recommendation, many=True).data
	return Response(serializer)




# @api_view(['GET'])
# def user_profile2(request):
# 	recommendation = Profile.objects.filter(user=request.user.id).first()
# 	serializer = ProfileSerializer(recommendation).data
# 	return HttpResponse(serializer)





class BlogModel_page(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = BlogModel.objects.all()
    serializer_class =  BlogModelSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)






class Contact_page(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = Contact.objects.all()
    serializer_class =  ContactSerializer


    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


from rest_framework.views import APIView
from rest_framework.response import Response


# from .serializers import RecommendationSerializer
# from .models import Recommendation
# from api import serializers

# git item

class BlogAPIView(APIView):

    def get(self, request, id):
        items = Profile.objects.get(id=id)
        serializer = ProfileSerializer(items, many=False)
        return Response({
            'success': True,
            'data': serializer.data
        })

profile_obj = Profile.objects.all()
course_obj = Course.objects.all()
BlogModel_obj = BlogModel.objects.all()



# from django.shortcuts import render

# from django.contrib.auth.decorators import login_required

# from .models import *
# from .serializer import *

# from django.contrib.auth.decorators import login_required

# from rest_framework.decorators import api_view
# from rest_framework.response import Response

# # @login_required
# # @api_view(['GET'])
# # def course2(request):
# # 	recommendation = Course.objects.all().order_by('-id')
# # 	serializer = CourseSerializer(recommendation, many=True).data
# # 	return Response(serializer)


from rest_framework import mixins
from rest_framework import generics


# class RegisterAPI(generics.GenericAPIView):
#   serializer_class = RegisterSerializer

#   def post(self, request, *args, **kwargs):
#     serializer = self.get_serializer(data=request.data)
#     serializer.is_valid(raise_exception=True)
#     user = serializer.save()
#     return Response({
#       "user": UserSerializer(user, context=self.get_serializer_context()).data,
#     })



# class Course_list(mixins.ListModelMixin,
#                   mixins.CreateModelMixin,
#                   generics.GenericAPIView):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)

# class Course_list2(mixins.ListModelMixin,
#                   mixins.CreateModelMixin,
#                   generics.GenericAPIView):
#     queryset = Course2.objects.all()
#     serializer_class = CourseSerializer2

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)





# class Video_list(mixins.ListModelMixin,
#                   mixins.CreateModelMixin,
#                   generics.GenericAPIView):
#     queryset = Video.objects.all()
#     serializer_class = VideoSerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)






        


# class Category_list(mixins.ListModelMixin,
#                   mixins.CreateModelMixin,
#                   generics.GenericAPIView):
#     queryset = Category.objects.all()
#     serializer_class = CategorySerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)






# class Teacher_list(mixins.ListModelMixin,
#                   mixins.CreateModelMixin,
#                   generics.GenericAPIView):
#     queryset = Teacher.objects.all()
#     serializer_class = TeacherSerializer

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)






@api_view(['GET','POST'])
def All(request):
	recommendation = BlogModel.objects.all().order_by('id')
	serializer = BlogModel2Serializer(recommendation, many=True).data
	serializer2 = BlogModel2Serializer(data=request.data)

	if serializer2.is_valid():
		serializer2.save()
	return Response(serializer)







from .serializer import BlogModel2Serializer
from .models import BlogModel


class Blog_list(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = BlogModel.objects.filter(is_blog=True)
    serializer_class = BlogModelSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)



class Project_list(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = BlogModel.objects.filter(is_project=True)
    serializer_class = BlogModelSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)




class Serv_list(mixins.ListModelMixin,
                  mixins.CreateModelMixin,
                  generics.GenericAPIView):
    queryset = BlogModel.objects.filter(is_serv=True)
    serializer_class = BlogModelSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)



# class Blog_list2(mixins.ListModelMixin,
#                   mixins.CreateModelMixin,
#                   generics.GenericAPIView):
#     queryset = Blog2.objects.all()
#     serializer_class = BlogSerializer2

#     def get(self, request, *args, **kwargs):
#         return self.list(request, *args, **kwargs)

#     def post(self, request, *args, **kwargs):
#         return self.create(request, *args, **kwargs)


# from rest_framework.fields import CurrentUserDefault

# @api_view(['GET'])
# def current_user(request):
#     user = request.user
#     return Response({
#       'username' : user.username,
#       'id' : user.id,
#        # and so on...
#     })



from .models import Home
from .serializer import HomeSerializer


# def showSingleHome(request):

#     home = Home.objects.all()

#     return JsonResponse({'home':home})

@api_view(['GET'])
def showSingleHome(request):

    home = Home.objects.all().first()
    serilizer = HomeSerializer(home, many=False)
    return Response(serilizer.data)



# def home_obj(request):
#     obj = Home.objects.get(id=5)
#     data = {
#         'title_ar':obj.title_ar,
#         'title_en':obj.title_en,
#         'disc_ar':obj.disc_ar,
#         'disc_en':obj.disc_en,
#         'image':obj.image
#     }
#     return JsonResponse(data)






@api_view(['PUT'])
def updateHome(request):
    home = Home.objects.all().first()
    serilizer = HomeSerializer(home, data=request.data)

    if serilizer.is_valid():
        serilizer.save()

    return Response(serilizer.data)

from .models import Profile
from .serializer import ProfileSerializer


# @api_view(['GET'])
# def showSingleProfile(request):

#     home = Profile.objects.all().first()
#     serilizer = ProfileSerializer(home, many=False)
#     return Response(serilizer.data)



# @api_view(['PUT'])
# def updateProfile(request):
#     home = Profile.objects.all().first()
#     serilizer = ProfileSerializer(home, data=request.data)

#     if serilizer.is_valid():
#         serilizer.save()

#     return Response(serilizer.data)










# @api_view(['GET'])
# def showAllStudents(request):

#     students = Student.objects.all()
#     serilizer = StudentSerializer(students, many=True)
#     return Response(serilizer.data)
    


@api_view(['GET'])
def showSingleStudent(request, pk):

    student = User.objects.get(id=pk)
    serilizer = UserSerializer(student, many=False)
    return Response(serilizer.data)

# @api_view(['POST'])
# def addStudent(request):
#     serilizer = StudentSerializer(data=request.data)

#     if serilizer.is_valid():
#         serilizer.save()

#     return Response(serilizer.data)



from .serializer import UserSerializer

@api_view(['PUT'])
def updateStudent(request,pk):
    user = User.objects.get(id=pk)
    serilizer = UserSerializer2(user, data=request.data)

    if serilizer.is_valid():
        serilizer.save()

    return Response(serilizer.data)




@api_view(['DELETE'])
def deleteProduct(request, pk):
    product = User.objects.get(id=pk)
    product.delete()

    return Response('Items delete successfully!')






from .serializer import CourseSerializer


@api_view(['GET'])
def showSingleCourse(request, pk):

    course = Course.objects.get(id=pk)
    serilizer = CourseSerializer2(course, many=False)
    return Response(serilizer.data)



@api_view(['PUT'])
def upCourse(request,pk):
    course = Course.objects.get(id=pk)
    serilizer = CourseSerializer(course, data=request.data)

    if serilizer.is_valid():
        serilizer.save()

    return Response(serilizer.data)


@api_view(['DELETE'])
def delCourse(request, pk):
    course = Course.objects.get(id=pk)
    course.delete()

    return Response('Items delete successfully!')







from. models import BlogModel
from .serializer import BlogModelSerializer, BlogModel2Serializer



@api_view(['GET'])
def showSingleBlog(request, pk):

    blogmodel = BlogModel.objects.get(id=pk)
    serilizer = BlogModelSerializer(blogmodel, many=False)
    return Response(serilizer.data)



@api_view(['PUT'])
def upBlog(request,pk):
    blogmodel = BlogModel.objects.get(id=pk)
    serilizer = BlogModel2Serializer(blogmodel, data=request.data)

    if serilizer.is_valid():
        serilizer.save()

    return Response(serilizer.data)


@api_view(['DELETE'])
def delBlog(request, pk):
    blogmodel = BlogModel.objects.get(id=pk)
    blogmodel.delete()

    return Response('Items delete successfully!')










@api_view(['GET'])
def homex(request, pk):

    blogmodel = Home.objects.get(id=pk)
    serilizer = HomeSerializer(blogmodel, many=False)
    return Response(serilizer.data)



@api_view(['PUT'])
def updatehomex(request,pk):
    blogmodel = Home.objects.get(id=pk)
    serilizer = HomeSerializer(blogmodel, data=request.data)

    if serilizer.is_valid():
        serilizer.save()

    return Response(serilizer.data)


@api_view(['DELETE'])
def deletehomex(request, pk):
    blogmodel = Home.objects.get(id=pk)
    blogmodel.delete()

    return Response('Items delete successfully!')















@api_view(['GET'])
def profilex(request, pk):

    blogmodel = Profile.objects.get(id=pk)
    serilizer = ProfileSerializer(blogmodel, many=False)
    return Response(serilizer.data)



@api_view(['PUT'])
def updateprofilex(request,pk):
    blogmodel = Profile.objects.get(id=pk)
    serilizer = ProfileSerializer(blogmodel, data=request.data)

    if serilizer.is_valid():
        serilizer.save()

    return Response(serilizer.data)
























from .forms import BlogForm






# def add_blog(request):
#     form = BlogForm(request.post)
#     context = {'form' : form}
#     # try:
#     #     if request.method == 'POST':
#     #         form = BlogForm(request.POST,request.FILES)
            
#     #         # if form.is_valid():
#     #         #     content = form.cleaned_data['content']
                
                
                
            
            
            
    
#     # except Exception as e :
#     #     print(e)
    
#     return Response(context)



from .serializer import ChangePasswordSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework import status


class ChangePasswordView(generics.UpdateAPIView):
    """
    An endpoint for changing password.
    """
    serializer_class = ChangePasswordSerializer
    model = User
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            # Check old password
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

