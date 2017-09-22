package controllers

import javax.inject.{Inject, Singleton}


import play.api.mvc._
import services.{NameService}

/**
  * This controller holds API methods for the application.
  *
  */
@Singleton
class ApiController @Inject()(cc: ControllerComponents, ns: NameService) extends AbstractController(cc) {

  //Get 'number' names from the name options available.
  def names(number: Int) = Action { implicit request =>
    Ok(scala.util.Random.shuffle(ns.names).take(number).toString)
  }


}
