import Avataaar from "./avataaar.js";

export function id2svg(id) {
   let avataaar = new Avataaar();
   avataaar.identifier = id;
   return avataaar.render();
}

export function props2svg(props) {
   let avataaar = new Avataaar();

   // The defaults
   let noseType = props["noseType"] || "Default";
   let topType = props["topType"] || "ShortHairShortFlat";
   let accessoriesType = props["accessoriesType"] || "Blank";
   let facialHairType = props["facialHairType"] || "Blank";
   let clothesType = props["clothesType"] || "ShirtVNeck";
   let eyeType = props["eyeType"] || "Default";
   let eyebrowType = props["eyebrowType"] || "Default";
   let mouthType = props["mouthType"] || "Default";
   let hairColor = props["hairColor"] || "BrownDark";
   let skinColor = props["skinColor"] || "Light";
   let facialHairColor = props["facialHairColor"] || "BrownDark";
   let hatColor = props["hatColor"] || "Heather";
   let shirtColor = props["shirtColor"] || "PastelBlue";

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
      hatColor,
      shirtColor
   );
   return avataaar.render();
}
