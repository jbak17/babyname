package services

import model.User

import scala.util.Random
import scala.collection.mutable.HashMap

class UserService {

  val UserhashMap = HashMap.empty[String, User]

  /*
  Adds new user to persistence layer
   */
  def addUser(newUser: User): Unit = {
    UserhashMap += (newUser.email -> newUser)
  }

  def removeUser(user: User): Unit = {
    UserhashMap -= user.email
  }

  def userExists(email: String): Boolean = {
    UserhashMap.contains(email)
  }
}
