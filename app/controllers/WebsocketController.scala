package controllers

import play.api.mvc._
import play.api.libs.streams.ActorFlow
import javax.inject.{Inject, Singleton}

import akka.actor._
import akka.stream._
import model._
import play.api.libs.json._



object WebSocketActor {
  def props(out: ActorRef) = Props(new WebSocketActor(out))
}

class WebSocketActor(out: ActorRef) extends Actor {

  var currentUser: User = User.generateRandomUser


  override def receive: Receive = {
    case msg: JsValue =>

      println(msg.toString())

      out ! "Hello".asInstanceOf[JsString]
  }

  override def postStop() {
    println("Disconnected.")
  }

}


@Singleton
class WebsocketController @Inject()(cc:ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {

  def socket = WebSocket.accept[JsValue, JsValue] { request =>
    ActorFlow.actorRef(out => WebSocketActor.props(out))
  }

}
