package services

import javax.inject.Singleton

import model.User

import scala.util.Random
import scala.collection.mutable.HashMap


@Singleton
class UserService {

  val UserhashMap = HashMap.empty[String, User]

  val usr: User = User("Error", "Error", "test@test.com")
  val testUser = User("test", "test@test.com", "random@random.com")
  addUser(testUser)
  addNametoUser(testUser.email, "Eva")
  addNametoUser(testUser.email, "Bob")
  addNametoUser(testUser.email, "Juno")
  addNametoUser(testUser.email, "Jane")
  //addPartner(testUser, User.generateId)

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

  def hasShortlistedName(user: User, name: String): Boolean = {
    user.nameList.contains(name)
  }


  def updateUser(old: User, replacement: User) = {
    removeUser(old)
    addUser(replacement)
  }

  /*
  When a new name comes through the name is either added to the users
  list of names, or the shortlist if their partner has also listed it.
   */
  def addNametoUser(email: String, name: String ) = {
    val olduser = getUser(email)
    val nameOnPartnerList: Boolean = userExists(olduser.partner) && hasShortlistedName(getUser(olduser.partner), name)
    val newusr = if (nameOnPartnerList) {
      User.addToShortlist(olduser, name)
    } else {
      User.addToNameList(olduser, name)
    }

    updateUser(olduser, newusr)
  }

}
