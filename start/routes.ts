import Route from "@ioc:Adonis/Core/Route";

Route.group(() => {
  Route.resource("/file", "FilesController").apiOnly();
}).prefix("api");
