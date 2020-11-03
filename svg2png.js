import XMLDOM from "xmldom/lib/dom-parser.js";
import CANVAS from "canvas";
import FETCH from "node-fetch";
import CANVG from "canvg";

async function svg2png(svg, width, height) {
   const preset = CANVG.presets.node({
      DOMParser: XMLDOM.DOMParser,
      canvas: CANVAS,
      fetch: FETCH,
   });

   const canvas = preset.createCanvas(width, height);
   const ctx = canvas.getContext("2d");
   const v = CANVG.Canvg.fromString(ctx, svg, preset);
   await v.render();

   return canvas.toBuffer();
}

export default svg2png;
