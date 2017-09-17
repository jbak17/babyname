package model

import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.libs.json

case class User(name: String, email: String, partner: Option[String] = None: Option[String], nameList: List[String] = List.empty)

object User {
  implicit val userWrites = new Writes[User] {
    def writes(user: User) = Json.obj(
      "name" -> user.name,
      "email" -> user.email,
      "partner" -> user.partner,
      "nameList" -> user.nameList
    )
  }

  implicit val residentReads: Reads[User] = (
    (JsPath \ "name").read[String] and
      (JsPath \ "email").read[String] and
      (JsPath \ "partner").readNullable[String] and //readNullable for option
      (JsPath \ "nameList").read[List[String]]
    )(User.apply _)

  def generateRandomUser: User = User("Jay", "j@g.com", None)

  def addToNameList(user:User, name: String): User = user.copy(nameList = name :: user.nameList)

  def addPartner(user: User, prtnr: Option[String]): User = user.copy(partner = prtnr)

  def hasPartner(user: User): Boolean = user.partner.isDefined

  def toJSONString(user: User): JsValue = {
    Json.toJson(user)
    //Json.stringify(jsVal)
  }
}
