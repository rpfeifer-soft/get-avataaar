import secrets from "./secrets.js";
import moment from "moment";
import Avataaar from "./avataar/avataaar.js";
import fs from "fs";

import XMLDOM from "xmldom/lib/dom-parser.js";
import CANVAS from "canvas";
import FETCH from "node-fetch";
import CANVG from "canvg";

function log(msg) {
   console.log(moment().format("DD.MM. HH:mm:ss.SSS") + ":", msg);
}

log(`Waiting to serve avataars`);

async function convert(svg, out) {
   const preset = CANVG.presets.node({
      DOMParser: XMLDOM.DOMParser,
      canvas: CANVAS,
      fetch: FETCH,
   });

   const canvas = preset.createCanvas(512, 512);
   const ctx = canvas.getContext("2d");
   const v = CANVG.Canvg.fromString(ctx, svg, preset);

   try {
      await v.render();

      const png = canvas.toBuffer();

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
      "Auburn",
      "BeardLight",
      "BlazerShirt",
      "Close",
      "Angry",
      "Concerned",
      "Black",
      "Auburn",
      "Black"
   );
   let svg = avatar.render();
   fs.writeFileSync("test/test.svg", svg);
   let test = 11;
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
      <img src="test/test${index}.svg" width="512" height="512"/>
   </td>
   <td>
      <img src="test/test${index}.png" width="512" height="512"/>
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
