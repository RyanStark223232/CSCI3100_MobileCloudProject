
## Available Scripts

In the project directory, you can run:

### `npm install`

Installs dependencies used in our website.

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

# Available Tabs

## Search Tab

### Image Search
We implemented image search using TFJS. This function is intended to let travellers who can visualize where his/her desired travel destination would be but cannot pinpoint the exact location. The procedure is achieved by 1) import a pre-trained MobileNetV2 model 2) obtain the activation in the middle of the model 3) perform classification using K-Nearest Neighbor Model
1. Click `Load` to import trained model
2. Click `Choose File` to upload image in .jpg format
3. Displays the most `Similar Location` in our database 
> The database currently only contains 5 locations Africa/HK/USA/India/England. They were only chosen because the google search results of these looked distinct enough for demo
4. The result would be supplied to location search to return posts of said location 

### Search-Result Table (FilteringTable)
This Search-Result Table is immature. The Image Search function above is not yet compatible to the Search-Result Table i.e. the result generated in the image search would not be the input in the "location" search at this moment. Moreover, the search method might change in future. (Instead of typing box, dropdown may be used)

Users can type their desired location, travelling style, travelling period and group size in the search-result table to search the output "posts". Initially, all the "posts" will be displayed on the page, until the users type in the search bar. In this initial code phase, the data is limited as follows:
1. Location: {Britain, Hong Kong, Japan}
2. Travel Style: {Shopping, Sporty, Cultural}
3. Period: {Day-Trip, Short-Trip, Weeks-Trip, Long-Trip, Exchange(student)}
4. Size: {Small, Medium, Large}

Multiselect would be included in the future updates. 

## Create Post & Edit Post Tab

Users can create and edit their profiles to seek out travel buddies of similar interests. Users can create their post to invite others to join their groups and travel together. Once the users create or edit their posts, the post details will be recorded to the Firebase backend. There are some fields that users have to input, including title, description, location, period of time, quota and remarks.

## Sign up & Sign in Tab

User Accounts are managed by Firebase as the backend server. We created a shared Firebase project and imported the javascript SDK into our App to associate the app with the Firebase project. 
When the user signs up for an account, the library function 
createUserWithEmailAndPassword() 
will be called, An account will be created in the Firebase project if the email and password are in valid format. The user will be automatically signed in once the account is successfully created.Then the user shall be directed to another page which shows a form requiring the user to provide detailed information about the account such as last name, first name, profile pic, etc. On submission of the form, all the data in the form will be sent to the realtime database in the Firebase project. The data will be associated with the user account so every account will maintain only one record. The User can modify these profile details later.
Once the user finishes the sign up procedures, He/She can login and logout with the matched email and password in the login page.
