import moment from "moment";
import express from "express";
import svg2png from "./svg2png.js";
import { id2svg, props2svg, rand2svg, id2json, props2json, rand2json } from "./avataaar/tool.js";
import swStats from "swagger-stats";

function log(msg) {
   console.log(moment().format("DD.MM. HH:mm:ss.SSS") + ":", msg);
}

async function svgFunction(req, res, svg) {
   log(req.url);
   if (req.params.type == "svg") {
      res.contentType("image/svg+xml");
      res.send(svg);
   } else {
      let png = await svg2png(svg, +req.params.width, +req.params.height);
      res.contentType("image/png");
      res.send(png);
   }
}

const app = express();

// Enable swagger-stats middleware in express app, passing swagger specification as option
app.use(
   swStats.getMiddleware({
      name: "avatar",
   })
);

app.get("/id/:id/(:width([0-9]+))x(:height([0-9]+)).(:type(png|svg))", (req, res) => {
   if (req.query.mode == "json") {
      let json = id2json(req.params.id);
      res.contentType("application/json");
      res.send(JSON.stringify(json, null, 3));
   } else {
      let svg = id2svg(req.params.id);
      svgFunction(req, res, svg);
   }
});
app.get("/random/(:width([0-9]+))x(:height([0-9]+)).(:type(png|svg))", (req, res) => {
   if (req.query.mode == "json") {
      let json = rand2json();
      res.contentType("application/json");
      res.send(JSON.stringify(json));
   } else {
      let svg = rand2svg();
      svgFunction(req, res, svg);
   }
});
app.get("/(:width([0-9]+))x(:height([0-9]+)).(:type(png|svg))", async (req, res) => {
   if (req.query.mode == "json") {
      let json = props2json(req.query);
      res.contentType("application/json");
      res.send(JSON.stringify(json));
   } else {
      let svg = props2svg(req.query);
      svgFunction(req, res, svg);
   }
});

app.listen(3000, () => {
   log(`Waiting to serve avataars on port 3000`);
});
