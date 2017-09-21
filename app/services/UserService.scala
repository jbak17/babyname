package services

import javax.inject.Singleton

import model.User

import scala.util.Random
import scala.collection.mutable.HashMap


@Singleton
class UserService {

  val names: List[String] = List(
    "Amy", "Beatrice", "Christene", "Agnus",
    "Narcisa", "Sharri", "Judith", "Chris",
    "Shaimka", "Krishna", "Renaldo", "Ian",
    "Carita", "Malka", "Malta", "Clemence",
    "Lauralee", "Else", "Minh", "Bill", "Kareen",
    "Ivana", "Wade", "Abram", "Abdi", "Mussa"
  )

  val UserhashMap = HashMap.empty[String, User]

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

  def makeUser(email: String, partner: String) = {
    addUser(User(scala.util.Random.nextString(5), email, partner))
    names.take(5).foreach(n => addNametoUser(email, n))
  }

  makeUser("fake@1.com", "fake@2.com")
  makeUser("fake@2.com", "fake@1.com")

  val usr: User = User("Error", "Error", "test@test.com")
  val evaUser = User("Eva", "eva@babyname.com", "jarrod@babyname.com")
  addUser(evaUser)
  addNametoUser(evaUser.email, "Agnes")
  addNametoUser(evaUser.email, "Chris")
  addNametoUser(evaUser.email, "Juno")
  addNametoUser(evaUser.email, "Jane")


}
