# HOLOGRAM

<!-- # <img src="/public/static/images/logo.jpg" alt="profile page for logged-in user wireframe" style="width:50px;"/>   MoOA - *Museum of Online Art*  -->


<!-- ## Table of Contents
  - [Description](#description)
  - [Index](#index)
  - [Link to live site](#link-to-live-site)
  - [Technologies](#technologies)
  - [Getting Started](#getting-started)
  - [Demo](#demo)
 -->
 
## Link to live site

Hosted on Heroku: [HOLOGRAM](https://hologram--app.herokuapp.com/)

## Description

HOLOGRAM is a social-media platform where users can share and comment on images, as well as communicate via direct messages. HOLOGRAM is clone of Instagram.

![image (7)](https://user-images.githubusercontent.com/93935486/167203477-10774428-62b8-4a43-bda4-7a9a9d349a78.png)

## Team

Created by <a href="https://github.com/madilippmann">Madi Lippmann</a>, <a href="https://github.com/nick-esqueda">Nick Esqueda</a>, and <a href="https://github.com/reversalbino">Kevin Pravia Mayorga</a> 

## Index
| [Features List](https://github.com/madilippmann/HOLOGRAM/wiki/features-list) | [Database Schema](https://github.com/madilippmann/HOLOGRAM/wiki/database-schema) | [Backend API Routes](https://github.com/madilippmann/HOLOGRAM/wiki/backend-api-routes) | [Frontend Routes](https://github.com/madilippmann/HOLOGRAM/wiki/frontend-routes) | [Redux Store](https://github.com/madilippmann/HOLOGRAM/wiki/redux-store) | [User Stories](https://github.com/madilippmann/HOLOGRAM/wiki/user-stories) | [Wireframes](https://github.com/madilippmann/HOLOGRAM/wiki/wireframes) |


## Technologies

HOLOGRAM was built using the following technologies:
<br>
<br>
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/heroku/heroku-plain-wordmark.svg" style="width:60px;" />
<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain-wordmark.svg" style="width:60px;" />

## Features

![image](https://user-images.githubusercontent.com/93935486/167233601-5f94a3ec-b22b-4d2f-9807-bd5a5b81c088.png)

### Posts
* Users can create a new post with an image and a caption.
* Users can edit and delete posts

### Likes
* Users can like and unlike the other user's posts

### Comments
* Users can comment on posts
* Users can update comments on psts
* Users can delete comments

![image](https://user-images.githubusercontent.com/93935486/167233634-84d1f77e-a10b-4f62-a039-e160af40a67c.png)


### Follows
* Users can follow other users
* Users can view other users' follwers/following lists

### Search
* Users can use a search bar to search for other users and posts

### Direct Messages
* Users can create a thread with one or more other users in it
* Users can message in real time in those threads

![image](https://user-images.githubusercontent.com/93935486/167233716-ed34cfe5-4719-402c-82a7-92b7661322dc.png)


## Getting Started
To see HOLOGRAM live, please click the link provided above.
To run HOLOGRAM locally, please follow these steps:
`DISCLAIMER: you must be able to create an AWS S3 bucket in order to properly store images/audio files that are uploaded to the site. Upload functionality will not work without it`
  <li>Clone the repository with  </li> 
  
    git clone https://github.com/madilippmann/HOLOGRAM.git
    
  <li>Create a database and database user. If using psql, the commands would be</li>
  
    psql
    CREATE USER hologram_app WITH PASSWORD <password> CREATEDB;
    CREATE DATABASE hologram_dev WITH OWNER hologram_app;
    
  <li>Navigate to the backend folder and install python packages </li>
  
    pipenv install
    pipenv shell
  
  <li>Create and seed database with </li>
  
    flask db upgrade
    flask seed all
    
  <li>Start the server with </li>
  
    flask run
    
  <li>Next, navigate to the react-app folder and run </li>
  
    npm install
    
  <li>Start the app with </li>
  
    npm start
    
  <li>You should now have HOLOGRAM running locally!</li>
  
## Future Features

  <li>Notifications</li>
  <li>Stories</li>
  <li>Multiple pictures in posts</li>
  
