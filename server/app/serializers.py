from marshmallow import Serializer, fields

class PageSerializer(Serializer):
    class Meta:
        fields = ("id","name","pageImg","paras","bounds")
         
class UserSerializer(Serializer):
    class Meta:
        fields = ("id", "title","img", "body", "user","tag", "created_at")

class ChangeSerializer(Serializer):
    user = fields.Nested(UserSerializer,many=True)
    class Meta:
	    fields = ("bounds","contents","user","date")

class ParaSerializer(Serializer):
    changes = fields.Nested(ChangeSerializer,many=True)

    class Meta:
        fields=("id","bounds","contents","changes")

class NoteSerializer(Serializer):
    class Meta:
        fields = ("id", "title","img", "body", "user","tag", "created_at")






