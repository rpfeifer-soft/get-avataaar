import { accessoriesTypes } from "./accessories.js";
import Avataaar from "./avataaar.js";
import { eyebrowTypes } from "./eyebrows.js";
import { eyeTypes } from "./eyes.js";
import { facialHairTypes } from "./facial-hair.js";
import { mouthTypes } from "./mouth.js";

function id2svg(id) {
   let avataaar = new Avataaar();
   avataaar.identifier = id;
   return avataaar.render();
}

function props2svg(props) {
   let avataaar = new Avataaar();

   // The defaults
   let noseType = "Default";
   let topType = "ShortHairShortFlat";
   let accessoriesType = "Blank";
   let facialHairType = "Blank";
   let clothesType = "ShirtVNeck";
   let eyeType = "Default";
   let eyebrowType = "Default";
   let mouthType = "Default";
   let hairColor = "BrownDark";
   let skinColor = "Light";
   let facialHairColor = "BrownDark";
   let hatColor = "Heather";

   avataaar.properties(
      noseType,
      topType,
      accessoriesType,
      facialHairType,
      clothesType,
      eyeType,
      eyebrowType,
      mouthType,
      hairColor,
      skinColor,
      facialHairColor,
      hatColor
   );
   return avataaar.render();
}
