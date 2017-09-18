package controllers

import javax.inject._

import model.User
import play.api.Logger
import play.api.libs.json.{JsValue, Json}
import play.api.mvc._
import services.UserService

/**
  * This controller creates an `Action` to handle HTTP requests to the
  * application's home page.
  */
@Singleton
class UserController @Inject()(cc: ControllerComponents, us: UserService) extends AbstractController(cc) {

  def create() = Action { implicit request =>
    val name: String = request.body.asFormUrlEncoded.get("name").head
    val email: String = request.body.asFormUrlEncoded.get("email").head
    val partner: String = request.body.asFormUrlEncoded.get("partner").head

    val user: User = User(name, email, partner)
    val status: Boolean = us.addUser(user)

    //todo: add some error checking here
    if (status) {
      Redirect(routes.HomeController.names(user.email))
    } else {
      Ok(views.html.index("Your new application is ready."))
    }

  }

  def login = Action { implicit request =>
    val user: String = request.body.asFormUrlEncoded.get("email").head

    //if exists forwards to controller.
    if (us.userExists(user)){
      Redirect(routes.HomeController.names(user))
    }
    //User doesn't exist
    else {Ok(views.html.index("Your new application is ready."))}
  }
}