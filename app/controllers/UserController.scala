package controllers

import javax.inject._

import model.User
import play.api.Logger
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

    val user: User = User(name, email)
    val status: Boolean = us.addUser(user)

    //todo: add some error checking here
    if (status) {
      Ok(views.html.names(user))
    } else {
      Ok(views.html.index("Your new application is ready."))
    }

  }

  def login(user: String) = Action { implicit request =>
    if (us.userExists(user)){
      val u: User = us.getUser(user)
      Ok(views.html.names(u))
    }
    //User doesn't exist
    else {Ok(views.html.index("Your new application is ready."))}
  }
}