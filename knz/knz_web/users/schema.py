from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.hashers import make_password, check_password
from django.db.models import Q


from graphene_django import DjangoObjectType
import graphene
import graphql_jwt
from graphene import relay, ObjectType
from graphene_django.filter import DjangoFilterConnectionField
from graphql import GraphQLError

# from knz_web.users.models import User
from knz_web.flashcards.models import Flashcards, Category, Snippets, User_Frontend, Deck
from graphql_auth.schema import UserQuery, MeQuery
from graphql_auth import mutations
from graphql_jwt.decorators import login_required, staff_member_required, user_passes_test, superuser_required

# @user_passes_test(lambda user: user.email.contains("@staff"))

User = get_user_model()


class UserFrontendType(DjangoObjectType):
    class Meta:
        model = User_Frontend
        fields = ("name", "email", "avatar_url", "id", "user_frontend_snippets", "user_frontend_flashcards")


class FlashcardsType(DjangoObjectType):
    class Meta:
        model = Flashcards
        # fields = "__all__"
        fields = ("deck", "question", "answer", "category", "user_frontend", "user")

    # @classmethod
    # def get_queryset(cls, queryset, info):
    #     if info.context.user.is_anonymous:
    #         return queryset.filter(published=True)
    #     return queryset


class DeckType(DjangoObjectType):
    class Meta:
        model = Deck
        fields = ("name",)


class FlashcardsNode(DjangoObjectType):
    class Meta:
        model = Flashcards
        # Allow for some  advanced filtering
        filter_fields = {
            "deck": ["exact"],
            "deck__name": ["exact", "icontains", "istartswith"],
            "question": ["exact", "icontains", "istartswith"],
            "answer": ["exact", "icontains", "istartswith"],
            "category": ["exact"],
            "user": ["exact"],
            "user_frontend__name": ["exact"],
            "user_frontend__email": ["exact"],
            "user_frontend__id": ["exact"],
            "category__name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (relay.Node,)

    # @classmethod
    # def get_node(self, info, id, **kwargs):
    #     user = kwargs.get("user_frontend_name")
    #     user_frontend = User_Frontend.objects.get(name=user)
    #     return self._meta.model.objects.get(user_fronted=user_frontend)


class SnippetsType(DjangoObjectType):
    class Meta:
        model = Snippets
        # fields = "__all__"
        fields = ("snippet", "published", "category", "user_frontend", "user")
        interfaces = (relay.Node,)


class SnippetsNode(DjangoObjectType):
    class Meta:
        model = Snippets
        # Allow for some more advanced filtering here
        filter_fields = {
            "snippet": ["exact", "icontains", "istartswith"],
            "category": ["exact"],
            "user": ["exact"],
            "user_frontend__name": ["exact"],
            "user_frontend__email": ["exact"],
            "user_frontend__id": ["exact"],
            "category__name": ["exact", "icontains", "istartswith"],
        }
        interfaces = (relay.Node,)

    # @classmethod
    # def get_node(self, info, id, **kwargs):
    #     user = kwargs.get("user_frontend_name")
    #     user_frontend = User_Frontend.objects.get(name=user)
    #     return self._meta.model.objects.get(user_fronted=user_frontend)


class CategoryType(DjangoObjectType):
    class Meta:
        model = Category
        # fields = "__all__"
        fields = ("name", "category_snippets", "category_flashcards")


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        filter_fields = ["name", "category_snippets", "category_flashcards"]
        interfaces = (relay.Node,)


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = ("username", "id", "email", "user_flashcards", "user_snippets")


class ErrorType:
    message = graphene.String()


class Query(UserQuery, MeQuery, ObjectType):
    single_user = graphene.Field(UserType, username=graphene.String(), password=graphene.String())
    users_list = graphene.List(UserType)
    flashcards = graphene.List(FlashcardsType, email=graphene.String())
    snippets = graphene.List(SnippetsType, email=graphene.String())
    category_list = graphene.List(CategoryType)
    # flashcards_test = graphene.List(FlashcardsNode, deck=graphene.String())

    # Nodes and Edges
    category_node = relay.Node.Field(CategoryNode)
    all_categories = DjangoFilterConnectionField(CategoryNode)
    flashcards_node = relay.Node.Field(FlashcardsNode)
    all_flashcards_paginate = DjangoFilterConnectionField(FlashcardsNode)
    snippets_node = relay.Node.Field(SnippetsNode)
    all_snippets_paginate = DjangoFilterConnectionField(SnippetsNode)

    # Frontend
    users_list_frontend = graphene.List(UserFrontendType)
    user_frontend = graphene.Field(UserFrontendType, email=graphene.String())
    frontend_user_flashcards = graphene.List(FlashcardsType, email=graphene.String())
    frontend_user_snippets = graphene.List(SnippetsType, email=graphene.String())
    frontend_flashcards_by_deck = graphene.List(FlashcardsType, deck=graphene.String(), email=graphene.String())

    def resolve_frontend_flashcards_by_deck(root, info, **kwargs):
        deck = kwargs.get("deck")
        email = kwargs.get("email")
        return Flashcards.objects.filter(user_frontend__email=email, deck__name=deck)

    def resolve_frontend_user_snippets(root, info, email, **kwargs):
        if not Snippets.objects.filter(user_frontend__email=email).exists():
            raise GraphQLError("User not found")
        return Snippets.objects.filter(user_frontend__email=email)

    def resolve_frontend_user_flashcards(root, info, **kwargs):
        email = kwargs.get("email")
        if not Flashcards.objects.filter(user_frontend__email=email).exists():
            return Exception("No Flashcards found")
        if email is not None:
            return Flashcards.objects.filter(user_frontend__email=email)

    def resolve_single_user(root, info, **kwargs):
        username = kwargs.get("username")
        password = kwargs.get("password")
        if username is not None and password is not None:
            user = authenticate(username=username, password=password)
            # user = User.objects.filter(username=username, password=password).first()
            if user is not None:
                return user
            else:
                raise Exception("Invalid username or password")
        else:
            raise Exception("Must provide username and password")

    # @login_required
    def resolve_users_list(root, info):
        return User.objects.all()

    # @login_required
    def resolve_flashcards(root, info, email=None, **kwargs):
        if not Flashcards.objects.filter(user_frontend__email=email).exists():
            raise Exception("No Flashcards found")
        if email is not None:
            return Flashcards.objects.filter(user_frontend__email=email).all()
        return Flashcards.objects.all()

    # @login_required
    def resolve_snippets(root, info, email=None, **kwargs):
        if not Snippets.objects.filter(user_frontend__email=email).exists():
            raise Exception("No Snippets found")
        if email is not None:
            return Snippets.objects.filter(user_frontend__email=email).all()
        return Snippets.objects.all()

    # @login_required
    def resolve_category_list(root, info):
        # token = info.context.session.get("token")
        # token2 = info.context.headers.get("token")
        # # refresh_token = info.context.cookie.get("token")
        # user = info.context.user
        # if not user.is_authenticated:
        #     raise Exception("Authentication credentials were not provided")

        return Category.objects.all()

    def resolve_users_list_frontend(root, info):
        return User_Frontend.objects.all()

    def resolve_user_frontend(root, info, **kwargs):
        email = kwargs.get("email")
        if not User_Frontend.objects.filter(email=email).exists():
            raise Exception("No User found")
        if email is not None:
            return User_Frontend.objects.filter(email=email).first()
        else:
            raise Exception("Must provide email")


class AuthMutation(graphene.ObjectType):
    register = mutations.Register.Field()
    # verify_account = mutations.VerifyAccount.Field()
    # resend_activation_email = mutations.ResendActivationEmail.Field()
    # send_password_reset_email = mutations.SendPasswordResetEmail.Field()
    # password_reset = mutations.PasswordReset.Field()
    # password_change = mutations.PasswordChange.Field()
    # archive_account = mutations.ArchiveAccount.Field()
    # delete_account = mutations.DeleteAccount.Field()
    # update_account = mutations.UpdateAccount.Field()
    # send_secondary_email_activation = mutations.SendSecondaryEmailActivation.Field()
    # verify_secondary_email = mutations.VerifySecondaryEmail.Field()
    # swap_emails = mutations.SwapEmails.Field()

    # django-graphql-jwt inheritances
    # token_auth = mutations.ObtainJSONWebToken.Field()
    # verify_token = mutations.VerifyToken.Field()
    # refresh_token = mutations.RefreshToken.Field()
    # revoke_token = mutations.RevokeToken.Field()


class FlashcardsCreateMutation(graphene.Mutation):
    class Arguments:
        deck = graphene.String(required=True)
        question = graphene.String(required=True)
        answer = graphene.String(required=True)
        category = graphene.String(required=True)

    flashcards = graphene.Field(FlashcardsType)
    # category_obj = Category.objects.get_or_create(name=category)

    @classmethod
    def mutate(cls, root, info, deck, question, answer, **kwargs):
        if kwargs.get("category") is None:
            category_obj = ["other"]
        else:
            category_obj = Category.objects.get_or_create(name=kwargs.get("category"))
        flashcards = Flashcards(
            deck=deck,
            question=question,
            answer=answer,
            category=category_obj[0],
            user=info.context.user,
        )
        flashcards.save()
        return FlashcardsCreateMutation(flashcards=flashcards)


class SnippetsCreateMutation(graphene.Mutation):
    class Arguments:
        snippet = graphene.String(required=True)
        published = graphene.Boolean(required=True)
        email = graphene.String(required=True)
        category = graphene.String(required=True)

    snippet = graphene.Field(SnippetsType)
    # category_obj = Category.objects.get_or_create(name=category)

    @classmethod
    def mutate(cls, root, info, snippet, published, **kwargs):
        # user = info.context.user
        if not User_Frontend.objects.filter(email=kwargs.get("email")).exists():
            raise Exception("No User found")

        if kwargs.get("category") is None:
            category_obj = ["other"]
        else:
            category_obj = Category.objects.get_or_create(name=kwargs.get("category"))
        snippet = Snippets(
            snippet=snippet,
            published=published,
            category=category_obj[0],
            user_frontend=User_Frontend.objects.get(email=kwargs.get("email")),
        )
        snippet.save()
        return SnippetsCreateMutation(snippet=snippet)


class UserCreateMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        password = graphene.String(required=False)
        email = graphene.String(required=True)
        avatar_url = graphene.String(required=False)

    user = graphene.Field(UserFrontendType)

    @classmethod
    def mutate(cls, root, info, name, password, email, avatar_url, **kwargs):
        if User_Frontend.objects.filter(name=name).exists():
            raise Exception("Username already exists")
        if User_Frontend.objects.filter(email=email).exists():
            raise Exception("Email already exists")
        password = make_password(password)

        user = User_Frontend.objects.create(name=name, password=password, email=email, avatar_url=avatar_url)
        return UserCreateMutation(user=user)


class Mutation(AuthMutation, graphene.ObjectType):
    # Authentication mutations
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    revoke_token = graphql_jwt.Revoke.Field()
    delete_token_cookie = graphql_jwt.DeleteJSONWebTokenCookie.Field()

    # Long running refresh tokens
    delete_refresh_token_cookie = graphql_jwt.DeleteRefreshTokenCookie.Field()

    # Other mutations
    flashcards_create_mutation = FlashcardsCreateMutation.Field()
    snippets_create_mutation = SnippetsCreateMutation.Field()
    new_user_mutation = UserCreateMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
