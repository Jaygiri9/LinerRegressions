using LinerRegression.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LinerRegression.Controllers
{
    public class HomeController : Controller
    {
        private LinerRegressionEntities db = new LinerRegressionEntities();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Get()
        {
            var data = db.Table_1.ToList();
            return Json(new { data }, JsonRequestBehavior.AllowGet);
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}