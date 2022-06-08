from numpy import source
from rest_framework import serializers
from base.models import Question, Answers



class QuestionSerializers(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = '__all__'


class AnswersSerializer(serializers.ModelSerializer):
    question = serializers.SerializerMethodField(source='Question')

    class Meta:
        model = Answers
        fields = '__all__'

    def get_question(self, obj):
        return obj.question.question

    
