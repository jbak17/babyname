## Background

This is an application for COSC360 using Play (Scala) for
the backend and Reactjs for the front end.

I had originally been working on a chess application,
but was not able to get it into a functional state
to be useful for a user. As such I switch to create
a basic baby naming application to display the 
technologies demonstrated in COSC360.

## App purpose
The purpose of the application is to help expecting
parents to choose a name for their baby. Each partner
creates an account and provides the email address of 
their partner. The app then links these two together.

Each partner creates their own shortlist of names.
When each partner has shortlisted the same name, that
name appears in a column listing all the agreed names.
In this way partners can find common ground, without
even talking! Surely the basis of a happy relationship. 

## Frontend
React is used for two parts of the front end: the login
and registration page (see login.jsx); and the lists of names 
(nameWindow.jsx). The latter is discussed here. 

The list of names is a bootstrap container of three
columns: one is responsible for dealing with user input
with buttons either accepting or rejecting a name. These
columns are contained in a "Box" element for managing
state. If a name is rejected a new name is suggested. If a name
is accepted it is sent via a web socket. The web
socket will respond with updated data which is then
propagated by React to all the components. 

# Websocket
A websocket (see nameWindow.jsx) is used to send JSON representation of users back
and forward from the front- to back-end. Every time a name
is selected the data is sent over the socket, updated in the server
and then returned as an updated user instance. 
 
# Canvas
To demonstrate the use of the Canvas HTML element I created
a simple display (bubbles.ts) that has black bubbles on a white background. 

## Backend
Play for Scala is used as the application framework. 

* Controllers: 
   * UserController: registration and login functions
   * HomeController: basic navigation routing
   * WebsocketController: handles in/out for websocket
* Model
    * User: contains declaration and helpers on companion object.
* Services
    * UserService: works with user model for application specific functionality such as adding names, updating lists, etc. 
   
   
  
