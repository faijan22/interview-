from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from base.models import Question, Answers
from base.serializers import QuestionSerializers, AnswersSerializer
import json

# Create your views here.
@api_view(['GET'])
def getQuestions(request):
    data = Question.objects.all()
    serializer = QuestionSerializers(data, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def submitResponse(request):
    data = request.data 
    print(data['data'])
    newData = json.loads(data['data'])
    for item in newData:
        print(item)
    print(data['username'])

    # TODO:
    # add the username 
    username = data['username']
    for item in newData:
        question = Question.objects.get(id=int(item['id']))
        entry = Answers.objects.create(
            User=username,
            question=question,
            answer=item['answerNumber']
        )
        entry.save()
    return Response({'okay':'yes'}, status=status.HTTP_200_OK)

@api_view(['GET'])
def getAllUsers(request):
    data = Answers.objects.all()
    newList = []
    for item in data:
        if item.User not in newList:
            newList.append(item.User)
        else:
            pass
    return Response({'data':newList}, status=status.HTTP_200_OK)

@api_view(['GET'])
def getAnswers(request, username):
    data = Answers.objects.filter(User=username)
    serializer = AnswersSerializer(data, many=True)
    return Response(serializer.data)
