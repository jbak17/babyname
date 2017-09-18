package model

import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.libs.json

import scala.util.Random

case class User(name: String, email: String, partner: String, nameList: List[String] = List.empty, shortList: List[String] = List.empty)

object User {
  implicit val userWrites = new Writes[User] {
    def writes(user: User) = Json.obj(
      "name" -> user.name,
      "email" -> user.email,
      "partner" -> user.partner,
      "nameList" -> user.nameList,
      "shortList" -> user.shortList
    )
  }

  implicit val userReads: Reads[User] = (
    (JsPath \ "name").read[String] and
      (JsPath \ "email").read[String] and
      (JsPath \ "partner").read[String] and
      (JsPath \ "nameList").read[List[String]] and
      (JsPath \ "shortList").read[List[String]]
    )(User.apply _)

  def generateRandomUser: User = User("Random", "random@random.com", "test@test.com")

  //def generateId: Option[String] = Random.alphanumeric.take(10).mkString.asInstanceOf[Option[String]]

  def addToNameList(user:User, name: String): User = user.copy(nameList = name :: user.nameList)

  def addToShortlist(user:User, name: String): User = user.copy(shortList = name :: user.shortList)

  //def addPartner(user: User, prtnr: Option[String]): User = user.copy(partner = prtnr)

  //def hasPartner(user: User): Boolean = user.partner != null

  def toJSONString(user: User): JsValue = {
    Json.toJson(user)
    //Json.stringify(jsVal)
  }
}
