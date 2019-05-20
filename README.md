# WebShop-using-MERN-stack
App includes usage of Redux, Transitions, Authentication

###### The App is live on: https://infinite-savannah-69971.herokuapp.com/

## Installation for development:

Once you copied or downloaded the entire repository, run these commands:
Inside the root folder run: npm install
Inside the client folder run: npm install
If you do not have mongodb driver installed on your PC, go into root folder of the app, then to config and into default.json file. You should see this:

{ "mongoURI": "mongodb://localhost:27017/webshop", "jwtSecret": "how ya doin" }

Basically put your own mongoURI if you have a different way of using mongoDB databases.

Once all of this is done, simply run this command in root folder: npm run dev
Go to http://localhost:3000/ and start using the application.
-- Some tips about the app:

Before you register and make an actual account you will not be able to manage any items. Both register and login, if successful, will automatically create token and you will be logged in until your token expires or you click on logout. All the usable buttons once you are logged are actually used in a smart way, for example: When you delete an item from proizvod list, if there were some proizvods with same name inside the cart, both proizvod from proizvod list and all same proizvods from cart proizvod list will be deleted at the same time. Same goes for update, if you update one proizvod, all the same proizvods from cart list will be updated accordingly. There is also a search option working nonstop for you.

Some screenshots:

https://i.imgur.com/GDlNBxz.png https://i.imgur.com/mID8qoo.png https://i.imgur.com/VZ6knR6.png https://i.imgur.com/4hewqDd.png
