# Restful-api

## Data Dashboard with Django-Rest framework
This is a Dashboard app built using Django REST Framework for backend and ReactJS for frontend. It include 4 charts with filters for year, sales and profit.

It has the following features:
- The backend is hosted at heroku, using PostgreSQL for database
- ReactJS Frontend consumes data prepared by Rest-API in JSON format
- User Authentication with session tokens
- Session management including time spent on website and interaction with charts/filters

## Requirements
- Python 3.6 or higher
- Django 3.0 or higher
- djangorestframework (3.8+)
- ReactJS

## Usage
The API calls are generated using serializer with following structure:
```python
from rest_framework import serializers

class SegSerializer(serializers.Serializer):
    segment = serializers.CharField(max_length=25, required=True)
    year = serializers.IntegerField()
    sales = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)
    profit = serializers.DecimalField(max_digits=12, decimal_places=5, required=True)

    class Meta:
        fields = ('segment', 'year', 'sales', 'profit')
```
The views.py file generates required object query and calls on serializers to generate JSON response for the API. 
This serializer will automatically convert all data fields obtained using filters applied to model objects and we receive a complete instance with filled data.
```python
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from restapi.models import superstore
from .serializers import SegSerializer

class segmentList(ListAPIView):
    queryset = ''
    def list(self, request):
        query1 = superstore.objects.annotate(year=ExtractYear('order_date')).values('segment', 'year')\
            .annotate(sales=Sum('sales'), profit=Sum('profit')).order_by('year')
        serializer =SegSerializer(list(query1), many=True)

        return Response(serializer)
```
The APIList view can be obtained from the link specified at urls.py file.
For example, we get the following data with related nested fields from our 'type' serializer:
```
{
    "segment": {
        "2014": [
            {
                "segment": "Consumer",
                "year": 2014,
                "sales": "262956.80060",
                "profit": "23837.31970"
            },
            {
                "segment": "Corporate",
                "year": 2014,
                "sales": "127797.49570",
                "profit": "13325.91250"
            },
            {
                "segment": "Home Office",
                "year": 2014,
                "sales": "89101.91180",
                "profit": "11724.99990"
            }
        ],
        "2015": [...]
        ...
        }
}
```
## ReactJS Based Frontend

## Session Management

## User Authentication
https://www.valentinog.com/blog/drf/ and https://www.youtube.com/playlist?list=PLillGF-RfqbbRA-CIUxlxkUpbq0IFkX60

Here, we have used the User model which comes default with Django.
```
from django.contrib.auth.models import User
``` 

We have used the django-rest-knox library. Django-rest-knox library provides models and views to handle token based authentication in a more secure and extensible way than the built-in TokenAuthentication scheme - with Single Page Applications and Mobile clients in mind. It provides per-client tokens, and views to generate them when provided some other authentication (usually basic authentication), to delete the token (providing a server enforced logout) and to delete all tokens (logs out all clients that a user is logged into).
```
<!--Inside onedsdjangoproject/settings.py-->
INSTALLED_APPS = [
    ...,
    'rest_framework',
    'knox',
    'accounts'
]

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': ('knox.auth.TokenAuthentication',)
}
```
So, after making migrations the registered Users' data gets stored in auth_user table. 

We have created a different Django 'app' called "accounts" for handling authentication. 
```
python manage.py startapp accounts
```
Creating and Validating the User:-

```
<!-- Inside accounts/serializers.py-->
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email')

class RegisterSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ('id', 'username', 'email', 'password')
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

    return user

class LoginSerializer(serializers.Serializer):
  username = serializers.CharField()
  password = serializers.CharField()

  def validate(self, data):
    user = authenticate(**data)
    if user and user.is_active:
      return user
    raise serializers.ValidationError("Incorrect Credentials")

```

Authentication related Post requests coming from frontend are handled as below:-

```
<!--Inside accounts/api.py-->

from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.models import AuthToken
from .serializers import UserSerializer, RegisterSerializer, LoginSerializer

class RegisterAPI(generics.GenericAPIView):
  serializer_class = RegisterSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.save()
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": AuthToken.objects.create(user)[1]
    })

class LoginAPI(generics.GenericAPIView):
  serializer_class = LoginSerializer

  def post(self, request, *args, **kwargs):
    serializer = self.get_serializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data
    _, token = AuthToken.objects.create(user)
    return Response({
      "user": UserSerializer(user, context=self.get_serializer_context()).data,
      "token": token
    })

class UserAPI(generics.RetrieveAPIView):
  permission_classes = [
    permissions.IsAuthenticated,
  ]
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user
```

Axios API requests from frontend are made to the following URLs for authentication related tasks.

```
<!--Inside accounts/urls.py-->
from django.urls import path, include
from .api import RegisterAPI, LoginAPI, UserAPI
from knox import views as knox_views

urlpatterns = [
  path('api/auth', include('knox.urls')),
  path('api/auth/register', RegisterAPI.as_view()),
  path('api/auth/login', LoginAPI.as_view()),
  path('api/auth/user', UserAPI.as_view()),
  path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout')
]
```

Frontend API calls via axios are made as below:-

```
<!--Inside frontend/src/actions/auth.js-->
import axios from 'axios';
import { returnErrors } from './messages';

import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // User Loading
  dispatch({ type: USER_LOADING });

  axios
    .get('/api/auth/user', tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, password });

  axios
    .post('/api/auth/login', body, config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
    });
};

// REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // Request Body
  const body = JSON.stringify({ username, email, password });

  axios
    .post('/api/auth/register', body, config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post('/api/auth/logout/', null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }

  return config;
};
```

Also, inside onedsdashboardapp/views.py file we have used the following 
```
permission_classes = [
        permissions.AllowAny,
    ]
```
but we can use
```
permission_classes = [
        permissions.IsAuthenticated,
    ]
```
if we don't want the charts' data to be rendered for unauthorized users.

## Authors
- github/ppundeer
- github/VaibhavSaini2000
- github/hitesh0902