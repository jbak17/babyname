package controllers

import play.api.mvc._
import play.api.libs.streams.ActorFlow
import javax.inject.{Inject, Singleton}

import akka.actor._
import akka.stream._
import model.User
import play.api.libs.json._
import services.{WebSocketService, UserService}


@Singleton
class WebsocketController @Inject()(cc:ControllerComponents) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {

  object WebSocketActor {
    def props(out: ActorRef) = Props(new WebSocketActor(out))
  }

  class WebSocketActor(out: ActorRef) extends Actor {

    var currentUser: User = User.generateRandomUser


    override def receive: Receive = {
      case msg: String =>

        //        println(msg.toString())
                val json: JsValue = User.toJSONString(currentUser)
        //        print(Json.prettyPrint(json))
        //
                out ! json.toString()
        //out ! "{server: data}"
    }

    override def postStop() {
      println("Disconnected.")
    }

  }


  def socket = WebSocket.accept[String, String] { request =>
    ActorFlow.actorRef(out => WebSocketActor.props(out))
  }


}
