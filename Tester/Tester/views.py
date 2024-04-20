from django.shortcuts import render
from django.http import HttpResponse
import json
import re

def helloview(request):

    return render(request,"screen.html")
def passwordcheck(request):
    #8 characters or more
    #special symbols
    #needs numbers
    #capital and lowercase letters

    password = json.loads(request.body)['password']
    pattern = re.compile("[`~!@#$%^&()*={|\\\"':;<>?/.,\[\]}]")
    if len(password) < 8:
        return HttpResponse("Needs 8 characters or more")
    if not any(char.isupper() for char in password) or not any(char.islower() for char in password):
        return HttpResponse("Needs an uppercase/lowercase")
    if not any(char.isdigit() for char in password):
        return HttpResponse("Needs number(s)")
    if not re.search(pattern,password):
        return HttpResponse("Needs special character(s)")

    return HttpResponse("success")


