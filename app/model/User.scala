package model

case class User(name: String, email: String, partner: Option[String] = None: Option[String], nameList: List[String] = List.empty)

object User {

  def generateRandomUser: User = User("Jay", "j@g.com", None)

  def addToNameList(user:User, name: String): User = user.copy(nameList = name :: user.nameList)

  def addPartner(user: User, prtnr: Option[String]): User = user.copy(partner = prtnr)

  def hasPartner(user: User): Boolean = user.partner.isDefined
}
