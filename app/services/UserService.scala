package services

import model.User

import scala.util.Random
import scala.collection.mutable.HashMap

class UserService {

  val UserhashMap = HashMap.empty[String, User]

  val usr: User = User("Error", "Error")
  val testUser = User("test", "test@test.com")
  addUser(testUser)
  addNametoUser(testUser.email, "one")
  addNametoUser(testUser.email, "two")
  addNametoUser(testUser.email, "three")
  addNametoUser(testUser.email, "Jane")

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

  def addNametoUser(email: String, name: String ) = {
    val oldlst = getUser(email)
    removeUser(oldlst)
    val newusr = User.addToNameList(oldlst, name)
    addUser(newusr)
  }

}
