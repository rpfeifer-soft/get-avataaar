import secrets from "./secrets.js";
import moment from "moment";
import fs from "fs";
import express from "express";
import Avataaar from "./avataaar/avataaar.js";
import { id2svg } from "./avataaar/tool.js";
import svg2png from "./svg2png.js";

function log(msg) {
   console.log(moment().format("DD.MM. HH:mm:ss.SSS") + ":", msg);
}

const app = express();

app.get("/id(/:id)?/(:width([0-9]+))x(:height([0-9]+)).(:type(png|svg))", (req, res) => {
   let svg = id2svg(req.params.id);

   res.send(svg);
});

app.listen(3000, () => {
   log(`Waiting to serve avataars`);
});
/*
let size = 512;
async function convert(svg, out) {
   try {
      const png = await svg2png(svg, size, size);

      fs.writeFileSync(out, png);
   } catch {}
}

async function start() {
   let html = `
   <html>
   <body>
      <table>
            `;

   
   let avatar = new Avataaar();
   avatar.identifier = "custom-seed";
   avatar.properties(
      "Default",
      "Turban",
      "Blank",
      "BeardLight",
      "GraphicShirtBat",
      "Close",
      "Angry",
      "Concerned",
      "Auburn",
      "Black",
      "Auburn",
      "Black",
      "Black"
   );
   let svg = avatar.render();
   fs.writeFileSync("test/test.svg", svg);
   let test = 12;
   let index = 1;
   let next = false;
   while ((next = avatar.next(test))) {
      avatar.properties(...next);
      let which = avatar.state[test];
      svg = avatar.render();
      fs.writeFileSync("test/test" + index + ".svg", svg);
      convert(svg, "test/test" + index + ".png");

      html += `<tr>
      <td>
      <img src="test/test${index}.svg" width="${size}" height="${size}"/>
   </td>
   <td>
      <img src="test/test${index}.png" width="${size}" height="${size}"/>
   </td><td>${which}</td></tr>
`;
      index++;
   }
   html += `
   </table>
</body>
</html>   
   `;

   fs.writeFileSync("test.html", html);
}

start();
*/
