package controllers

import javax.inject._
import play.api.mvc._

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class HomeController @Inject()(cc: ControllerComponents) extends AbstractController(cc) {

  /*
  Home page where the user lands
   */
  def index = Action {
    Ok(views.html.index("Your new application is ready."))
  }

  /*
  Page for user to select names and see what names they have in common
  with their partner.
   */
  def names(user: String) = Action {
    Ok(views.html.nameGame("Ready to play"))
  }

}
