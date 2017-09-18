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
class WebsocketController @Inject()(cc:ControllerComponents, us: UserService) (implicit system: ActorSystem, mat: Materializer) extends AbstractController(cc) {

  object WebSocketActor {
    def props(out: ActorRef) = Props(new WebSocketActor(out))
  }

  /*
  This is the kind of actor that we need for our usage. This
  decides how the actor will respond to messages that come in.
   */
  class WebSocketActor(out: ActorRef) extends Actor {

    override def receive: Receive = {

      case msg: JsValue =>

        val json: JsValue = msg
        val user: JsResult[User] = Json.fromJson[User](msg)

        user match {
          case JsSuccess(u: User, path: JsPath) => {
            println(u.name + " communicating over socket.")

            //get partner's list of names
            val partner: List[String] = us.getUser(u.partner).nameList

            //calculate shortlist
            val sL: List[String] = u.nameList.filter(name => partner.contains(name))

            //update user
            val newUser: User = u.copy(shortList = sL)

            //update persistence layer with new information
            us.updateUser(us.getUser(u.email), newUser)

            out ! Json.toJson(newUser)
          }
          case e: JsError => println("Errors: " + JsError.toJson(e).toString())
        }

    }

    override def postStop() {
      println("Disconnected.")
    }

  }


  /*
  This is the handler function for the route calling from JS creating
  the socket.
   */
  def socket = WebSocket.accept[JsValue, JsValue] { request =>
    ActorFlow.actorRef { out => Props(new WebSocketActor(out))}
  }


}
