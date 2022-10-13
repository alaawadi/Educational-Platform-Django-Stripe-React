import profile
from django.urls import path, re_path
from .import views


from .views import profile_obj,course_obj,BlogModel_obj

urlpatterns = [
    # path('chart',views.chart2),
    # path('course',views.Course_list.as_view() , name='Course_list'),
    # path('course2',views.Course_list2.as_view() , name='Course_list2'),
    # path('video',views.Video_list.as_view() , name='Video_list'),
    # path('category',views.Category_list.as_view() , name='Category_list'),
    # path('teacher',views.Teacher_list.as_view() , name='Teacher_list'),
    # path('blog',views.Blog_list.as_view() , name='Blog_list'),
    # path('signup',views.RegisterAPI.as_view() , name='RegisterAPI'),
    # path('blog2',views.Blog_list2.as_view() , name='Blog_list2'),
    # path('user',views.current_user , name='current_user'),
    path('',views.index,name='home'),
    path('profile',views.index),
    
    path('services',views.index),
    path('login3',views.index),
    path('home2',views.index),
    path('about',views.index),
    path('courses',views.index),
    path('blogs',views.index),
    path('projects',views.index),
    path('teacher',views.index),
    path('contact',views.index),
    path('video',views.index), 
    path('signup',views.index),
    path('createcourse',views.index),
    path('auth',views.is_authenticated),
    path('signupapi',views.RegisterAPI.as_view()),
    path('services/',views.All),
    path('users/',views.users),
    path('create_list2/',views.create_list.as_view()),
    
    
    path('create_list/',views.create_list2.as_view()),
    
    
    path('all_courses/',views.all_Courses.as_view()),
    path('home/',views.home_page.as_view()),
    path('video_page/',views.video_page.as_view()),
    path('Profile_page/',views.Profile_page.as_view()),
    
    path('ProfileDetailView/<int:id>',views.ProfileDetailView.as_view()),
    path('use/',views.use),
    path('blog_count/',views.blog_count),
    path('project_count/',views.project_count),
    path('course_count/',views.course_count),
    path('Blog_list/',views.Blog_list.as_view()),
    path('Project_list/',views.Project_list.as_view()),
    path('Serv_list/',views.Serv_list.as_view()),

    
    path('user_profile/',views.user_profile),
    # path('user_profile2/',views.user_profile2),
    path('Contact_page/',views.Contact_page.as_view()),
    path('BlogModel_page/',views.BlogModel_page.as_view()),
    path('profile_p/<int:id>',views.BlogAPIView.as_view()),
    path('BlogModelDetailView/<int:id>',views.BlogModelDetailView.as_view()),

    path('like_dislike/<id>' , views.like_dislike , name="like_dislike"),
    path('like_dislike2/<id>' , views.like_dislike2 , name="like_dislike2"),
    
    path('dashboard',views.index),
    path('dashboard2',views.index),
    path('dashboard3',views.index),
    path('dashboard4',views.index),
    path('dashboard5',views.index),
    path('Profiledash',views.index),

    path('create-payment-intent/<pk>/', views.StripeIntentView.as_view(), name='create-payment-intent'),
    path('webhooks/stripe/', views.stripe_webhook, name='stripe-webhook'),
    path('cancel/', views.CancelView.as_view(), name='cancel'),
    path('success/', views.SuccessView.as_view(), name='success'),
    path('home2/<int:id>', views.ProductLandingPageView.as_view(), name='landing-page'),
    path('create-checkout-session/<pk>/', views.CreateCheckoutSessionView.as_view(), name='create-checkout-session'),


    # path('showSingleHome/',views.showSingleHome),
    # path('updateHome/',views.updateHome),

    path('change-password/', views.ChangePasswordView.as_view(), name='change-password'),

    path('showSingleStudent/<pk>',views.showSingleStudent),
    path('updateStudent/<pk>',views.updateStudent),
    path('deleteProduct/<pk>',views.deleteProduct),

    path('showSingleCourse/<pk>',views.showSingleCourse),
    path('upCourse/<pk>',views.upCourse),
    path('delCourse/<pk>',views.delCourse),

    
    path('showSingleBlog/<pk>',views.showSingleBlog),
    path('upBlog/<pk>',views.upBlog),
    path('delBlog/<pk>',views.delBlog),


    
    path('homex/<pk>',views.homex),
    path('updatehomex/<pk>',views.updatehomex),
    path('deletehomex/<pk>',views.deletehomex),

    path('profilex/<pk>',views.profilex),
    path('updateprofilex/<pk>',views.updateprofilex),
    


    path('all/',views.All),
    # path('home_obj/',views.home_obj)

    # path('add_blog/' , views.add_blog , name="add_blog"),

    # path('blog_form/',views.BlogForm)

]
    
if profile_obj:
    for i in profile_obj:
        urlpatterns += [path(f'profile_detail/{str(i.id)}',views.index),]
if course_obj:
    for i in course_obj:
        urlpatterns += [path(f'video/{str(i.id)}',views.index),]
if BlogModel_obj:
    for i in BlogModel_obj:
        urlpatterns += [path(f'blogdetail/{str(i.id)}',views.index),]


from django.views.generic import TemplateView
from django.urls import re_path

# urlpatterns += [re_path(r'^.*', TemplateView.as_view(template_name='index.html'))]
