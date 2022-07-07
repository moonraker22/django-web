<h2 align="center">
<strong>KNZ Flashcards And Snippets</strong> 
</h2>

***

<h4 align="center">
A project for CS50
</h4>

***


<div align="center">
    <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.qLcU7S0-KTkbSmEomofo-wAAAA%26pid%3DApi&f=1" />
</div>

***


[![Link to video of my app.](https://img.shields.io/badge/Link%20to%20video%20of%20my%20app-KNZ%20Flashcards%20%26%20Snippets-lightgrey)](https://youtu.be/AmQ_ZaWUTLA)

<a href="http://www.youtube.com/watch?feature=player_embedded&v=YOUTUBE_VIDEO_ID_HERE
" target="_blank"><img src="http://img.youtube.com/vi/AmQ_ZaWUTLA/0.jpg" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

***
### Distinctiveness and Complexity: 
The project I created I believe is sufficiently distinct from the other projects in CS50. It is not a e-commerce or networking type app. It also is not based on the old CS50W Pizza Project. I believe it is sufficiently complex as I have implemented the entire front end in the Next.js React framework and I used many different libraries. The Django backend is also very complex and I have implemented a lot of features. I set it up with cookie-cutter-django which uses a custom user model and implements 12-Factor based settings via django-environ. It includes django-allauth which is a set of Django applications addressing authentication, registration, account management as well as 3rd party (social) account authentication. Many of the practices implemented in cookie-cutter-django are from the book "Two Scoops of Django: Best Practices for Django 3" by Audrey Roy. I also used the Django-Rest-Framework to implement an API for the front end. However after creating the rest API I found GraphQL and was amazed at how powerful it was for returning data to the frontend so I learned how to integrate it with Django and wound up using it to power my frontend. I made sure the app is mobile responsive by using media queries as well as components from the MUI library. 

***

### The App:
I built a fullstack application with many different languages, libraries, and technologies. I used Django as the backend server, I then integrated the Django Rest Framework. I also integrated Graphene, Graphene-Django, and Graphene-Relay to provide data to my frontend.
On the frontend I used the Next.js React library to to render the data from the backend. The app is a flashcards and snippets application where the user can create diffent decks of flashcards arranged by topic. The flashcard has a question with a textarea for the user to type the response. Then the user can click the button to show the answer. In the snippets section the user can save code snippets they like or use organized by category. I spent a lot of time on this app and really used it as a testing ground to learn all the integrated technologies.

***

### Backend: 
:shipit:

I started the project by using [Cookie Cutter Django](https://github.com/cookiecutter/cookiecutter-django). Cookiecutter Django is a framework for jumpstarting production-ready Django projects quickly. It creates a project with 100% test coverage. It includes 12-Factor based settings via django-environ. It implements Registration via django-allauth. It also includes a custom user model, and a Procfile for deploying to Heroku. I used a PostgreSQL database and the Django ORM using models to store user, flashcards, and snippet data. I then integrated [Graphene-Django](https://docs.graphene-python.org/projects/django/en/latest/) which "provides some additional abstractions that make it easy to add GraphQL functionality to your Django project". Graphene-Django makes it easy to use GraphQL with your Django project. [GraphQL](https://graphql.org/) is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL makes it easy to use one endpoint to query just the data you need from the server. 

***

<div align="center">
    <img src="https://camo.githubusercontent.com/92ec9eb7eeab7db4f5919e3205918918c42e6772562afb4112a2909c1aaaa875/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313630373535343338352f7265706f7369746f726965732f6e6578742d6a732f6e6578742d6c6f676f2e706e67" />
</div>

### Frontend:
:shipit:

On the frontend I used the Next.js React library for the UX/UI.  According to [NextJS](https://nextjs.org/) "Next.js gives you the best developer experience with all the features you need for production: hybrid static & server rendering, TypeScript support, smart bundling, route pre-fetching, and more. No config needed."
I enjoyed using NextJS as the file based routing structure makes it easy to create url patterns. It includes static site generation and server side rendering. For the UX/UI I used [MUI](https://mui.com/). MUI is a " accessible library of foundational and advanced components, enabling you to build your design system and develop React applications faster." It is similar to bootstrap in that it makes it easier to create consistant reusable styling for your site. To fetch data from the server I used [Apollo Client](https://www.apollographql.com/docs/react/) which "is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL." It includes some great hooks that aloow you to fetch data in react from a GraphQL server. I experimented with different ways of passing context down the component tree. I tried [Jotai](https://jotai.org/) as well as the React Context API. I created a layout with the [MUI Treasury](https://mui-treasury.com/) which makes it easy to craete navigation and footers for your entire site without having to manually include the elemnts on every page. For authentication I used [Next-Auth(https://github.com/nextauthjs/next-auth) which can make it easy to implement OAuth with many differnt providers as well as password authentication. I implemented password as well as Github authentication. The app captures the profile data from Github on authentication and creates a user in the datatbase. It then uses sessions to keep a user logged in and display relavent content.The UX/UI is far from polished as I integrated a lot of different technologies and really spent a lot of time exploring the features of them however this is not a production site and a learning experience.

***

### Some Of The Folders and Files I Created

* knz/knz_web/users/models.py contains the custom user model.
* knz/knz_web/users/schema.py contains the schema for the GraphQL API.
* knz/knz_web/users/forms.py contains the forms for the registration and login pages.
* knz/knz_web/users/api/serializers.py contains the serializers for the Django-Rest-Framework API.
* knz/knz_web/flashcards/models.py contains the flashcard and snippet models as well as the frontend user model.
* knz/knz_web/flashcards/serializers.py contains the serializers for the Django-Rest-Framework API for flashcards and snippets.
* knz/knz_web/flashcards/admin.py contains the admin customizations for the flashcards and snippets.
* knz/frontend/knz folder contains the Next.js frontend files.
* knz/frontend/knz/pages folder contains the pages I created for the Next.js frontend.
* knz/frontend/knz/api/auth contains the authentication config for Next-Auth.
* knz/frontend/knz/lib contains the Apollo Client Query and Mutation files.
* knz/frontend/knz/src contains the theme for MUI Library.
* knz/frontend/knz/utils contains the utils I created to paginate and sort the data returned from the GraphQL API.
* knz/frontend/knz/components contains many component files I created to render to power the frontend.

***

### How to use the app

To use this app you must install the following:
* All the requirements listed in the requirements.txt file.
* All the requirements listed package.json file.
* All the requirements listed in the knz/frontend/ package.json file.
  
You can then run the following commands to start the app:
* `npm install` to install all the dependencies listed in package.json.
* `pip install -r requirements.txt` to install all the dependencies listed in requirements.txt.
* `python manage.py makemigrations` to create the migrations for the database.
* `python manage.py migrate` to apply the migrations to the database.
* `npm run dev` in the knz/ folder to start gulp and run the dev server.
* `npm run dev` in the knz/frontend/ folder to start Next.js for the frontend.

Then you can access the app at the following url:
* http://localhost:3000/

