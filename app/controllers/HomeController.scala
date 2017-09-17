package controllers

import javax.inject._

import model.User
import play.api.libs.json.{JsValue, Json}
import play.api.mvc._
import services.UserService

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents, us: UserService) extends AbstractController(cc) {

  /*
  Home page where the user lands
   */
  def home = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  /*
  Page for user to select names and see what names they have in common
  with their partner.
   */
  def names(user: String) = Action {
    val usr: User = us.getUser(user)
    val json: JsValue = User.toJSONString(usr)

    Ok(views.html.names(json))
  }

}
