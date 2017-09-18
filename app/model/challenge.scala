package model

import play.api.libs.json.{JsPath, Json, Reads, Writes}
import play.api.libs.functional.syntax._

import scala.collection.mutable
import scala.util.Random

case class Id[T](id: String)

/*
Challenge is identified by a random String. Once both candidates have added the same name to the
candidate name list, the name is added ot the names variable.
 */
case class Challenge (id: String, names: List[String])

/*
object Challenge {


  implicit val challengeWrites = new Writes[Challenge] {
    def writes(challenge: Challenge) = Json.obj(
      "id" -> challenge.id,
      "names" -> challenge.names,
      "candidates" -> challenge.candidate_names
    )
  }

  implicit val challengeReads: Reads[Challenge] = (
    (JsPath \ "id").read[String] and
      (JsPath \ "names").read[List[String]] and
      (JsPath \ "candidate_names").read[mutable.Map[String, Seq[User]]]
    )(Challenge.apply _)
}
*/