import secrets from './secrets.js';
import moment from 'moment';
import Avataaar from './avatar.js';
import fs from 'fs';

import XMLDOM from 'xmldom/lib/dom-parser.js';
import CANVAS from 'canvas';
import FETCH from 'node-fetch';
import CANVG from 'canvg';

function log(msg) {
   console.log(moment().format('DD.MM. HH:mm:ss.SSS')+':', msg);
}

log(`Waiting to serve avataars`);

let avatar = new Avataaar();
avatar.identifier = "custom-seed";
let svg = avatar.render();
fs.writeFileSync('test.svg', svg);

async function convert() {

   const preset = CANVG.presets.node({
      DOMParser: XMLDOM.DOMParser,
      canvas: CANVAS,
      fetch: FETCH
   });
   
   const canvas = preset.createCanvas(64, 64);
   const ctx = canvas.getContext('2d');
   const v = CANVG.Canvg.fromString(ctx, svg, preset);

   await v.render();

   const png = canvas.toBuffer();

   fs.writeFileSync('test.png', png);
}

log(svg);

convert();
