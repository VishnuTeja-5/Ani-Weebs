
# ANI - WEEBS

![Ani Weebs Logo](/public/img/Ani-weebs%20logo.png)

## Introduction

Ani-Weebs is a video on demand (Web Streaming) platform, where you can watch exclusive anime content including movies and series. 

## Project Setup

1. Install Nodejs and Apache mysql server (Xampp)  
2. Download the project folder and navigate into the folder   
3. Now open the terminal and type "npm install". This will install all required packages  
4. Navigate to db.js file in database folder and add your database password in password field  
5. Create a database named as "ani_weebs" and import the data from "ani_weebs.sql"  
6. To manage media data create a free account in [cloudinary](https://cloudinary.com), next create a ".env" file and copy paste the text from env.sample file and include the credentials of your account  
7. To run project type "node index.js" in the terminal and navigate to "http://127.0.0.1:3000" in your browser

By following above steps we can easily setup and run the project.

___

## More Details about project

Basically the project is divided into two modules  
1. User Module  
2. Admin Module  

### User Module

+ The user can simply visit the website and watch the desired content  

### Admin Module

+ The admin has full authorization to manage the web content. He needs to login using his registerd credentials to manage content.  
+ Admin is allowed to perform all basic CRUD operations. He can add, edit & delete the content
+ Admin can manage movies and series separately with ease  

## Data Model

#### Admin Table
![Admin Table](/public/Admin%20Table.png)

#### Anime Table

![Anime Table](/public/Anime%20Table.png)

#### Episode Table
![Episode Table](/public/Episode%20Table.png)

#### Movie Table
![Movie Table](/public/Movie%20Table.png)

#### Relation Diagram

![relation diagram](/public/relation.png)

*Whole media is stored in cloudinary (cloud), whereas remaining content information is stored in database.*

### Tech Stack

+ Frontend  
  HTML, Vanilla CSS, JS, EJS (template engine)  
+ Backend  
  Nodejs, Express js, Mysql, Cloudinary


#### *Please support by sharing your feedback for further enhancements. Thank you.*