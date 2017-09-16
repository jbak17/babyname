package services

import model.User

import scala.util.Random
import scala.collection.mutable.HashMap

class UserService {

  val UserhashMap = HashMap.empty[String, User]

  val usr: User = User("Error", "Error")

  /*
  Adds new user to persistence layer
   */
  def addUser(newUser: User): Boolean = {
    UserhashMap += (newUser.email -> newUser)
    true
  }

  def removeUser(user: User): Unit = {
    UserhashMap -= user.email
  }

  def userExists(email: String): Boolean = {
    UserhashMap.contains(email)
  }

  def getUser(email: String): User = {
    UserhashMap.get(email).map(u =>
      u)
      .getOrElse(usr)
  }
}
