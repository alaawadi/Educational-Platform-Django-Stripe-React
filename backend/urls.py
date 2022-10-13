from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('base.api.urls')),
    path('', include('pages.urls')),
    # path('cart/', include('cart.urls')),
    path("", include("django.contrib.auth.urls")),
    path('froala_editor/',include('froala_editor.urls')),
    path('summernote/', include('django_summernote.urls')), # using include('django_summernote.urls')
    path('editor/', include('django_summernote.urls'))
]
urlpatterns +=  static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
