package services

import java.util.concurrent.ConcurrentHashMap

import akka.actor._
import play.api.libs.json._

class WebSocketService {

  /*
  When a user logs in they need to register their ID with the listener
  if they have one so they can communicate with their partner.
   */
  import scala.collection.JavaConverters._
  var listeners = new ConcurrentHashMap[String, Seq[ActorRef]]().asScala

  /** Adds an actor as a listener to a browser */
  def addBrowser(id: String, actor:ActorRef): Unit = {
    listeners.get(id) match {
      case Some(actors) => listeners(id) = actors :+ actor
      case _ => listeners(id) = Seq(actor)
    }
  }

}
