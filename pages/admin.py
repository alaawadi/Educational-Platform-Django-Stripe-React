from operator import concat
from django.contrib import admin
from .models import *
# Register your models here.
admin.site.register(User)
admin.site.register(Services)
admin.site.register(Home)
admin.site.register(Course)
admin.site.register(Category)
admin.site.register(Video)
admin.site.register(Profile)

admin.site.register(blog_Category)
admin.site.register(Project_Category)

from django_summernote.admin import SummernoteModelAdmin

class BlogModelAdmin(SummernoteModelAdmin):
    # exclude = ('slug', )
    # list_display = ('id', 'title', 'category', 'date_created')
    # list_display_links = ('id', 'title')
    search_fields = ('title', )
    list_per_page = 25
    summernote_fields = ('content2', )


admin.site.register(BlogModel)
admin.site.register(Contact)
admin.site.register(Product)
# admin.site.register(order)