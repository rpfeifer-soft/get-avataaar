import Random from "./avataar/random.js";
import { accessoriesTypes } from "./avataar/accessories.js";
import { facialHairTypes } from "./avataar/facial-hair.js";
import { topTypes } from "./avataar/top.js";
import { mouthTypes } from "./avataar/mouth.js";
import { clothesType } from "./avataar/clothes.js";
import { eyeTypes } from "./avataar/eyes.js";
import { eyebrowTypes } from "./avataar/eyebrows.js";
import { noseTypes } from "./avataar/nose.js";

export default class Avataaar {
   static get hatColors() {
      return {
         Black: "#262E33",
         Blue01: "#65C9FF",
         Blue02: "#5199E4",
         Blue03: "#25557C",
         Gray01: "#E6E6E6",
         Gray02: "#929598",
         Heather: "#3C4F5C",
         PastelBlue: "#B1E2FF",
         PastelGreen: "#A7FFC4",
         PastelOrange: "#FFDEB5",
         PastelRed: "#FFAFB9",
         PastelYellow: "#FFFFB1",
         Pink: "#FF488E",
         Red: "#FF5C5C",
         White: "#FFFFFF",
      };
   }
   static get hairColors() {
      return {
         Auburn: "#A55728",
         Black: "#2C1B18",
         Blonde: "#B58143",
         BlondeGolden: "#D6B370",
         Brown: "#724133",
         BrownDark: "#4A312C",
         PastelPink: "#F59797",
         Platinum: "#ECDCBF",
         Red: "#C93305",
         SilverGray: "#E8E1E1",
      };
   }
   static get skinColors() {
      return {
         Tanned: "#FD9841",
         Yellow: "#F8D25C",
         Pale: "#FFDBB4",
         Light: "#EDB98A",
         Brown: "#D08B5B",
         DarkBrown: "#AE5D29",
         Black: "#614335",
      };
   }

   properties(
      noseType,
      topType,
      accessoriesType,
      hairColor,
      facialHairType,
      clotheType,
      eyeType,
      eyebrowType,
      mouthType,
      skinColor,
      facialHairColor,
      hatColor
   ) {
      this.state = [
         noseType,
         topType,
         accessoriesType,
         hairColor,
         facialHairType,
         clotheType,
         eyeType,
         eyebrowType,
         mouthType,
         skinColor,
         facialHairColor,
         hatColor,
      ];
      this.colors = {};
      this.colors["--avataaar-internal-circle-color"] = "#6fb8e0";

      this.noseType = noseTypes[noseType];
      this.topType = topTypes[topType];
      this.accessoriesType = accessoriesTypes[accessoriesType];
      this.colors["--avataaar-hair-color"] = Avataaar.hairColors[hairColor];
      this.facialHairType = facialHairTypes[facialHairType];
      this.clotheType = clothesType[clotheType];
      this.eyeType = eyeTypes[eyeType];
      this.eyebrowType = eyebrowTypes[eyebrowType];
      this.mouthType = mouthTypes[mouthType];
      this.colors["--avataaar-skin-color"] = Avataaar.skinColors[skinColor];
      this.colors["--avataaar-facial-hair-color"] = Avataaar.hairColors[facialHairColor];
      this.colors["--avataaar-hat-color"] = Avataaar.hatColors[hatColor];
   }

   next(what) {
      if (!this.state) {
         return false;
      }
      let keys = [];
      switch (what) {
         case 0:
            keys = Object.keys(noseTypes);
            break;
         case 1:
            keys = Object.keys(topTypes);
            break;
         case 2:
            keys = Object.keys(accessoriesTypes);
            break;
         case 3:
            keys = Object.keys(Avataaar.hairColors);
            break;
         case 4:
            keys = Object.keys(facialHairTypes);
            break;
         case 5:
            keys = Object.keys(clothesType);
            break;
         case 6:
            keys = Object.keys(eyeTypes);
            break;
         case 7:
            keys = Object.keys(eyebrowTypes);
            break;
         case 8:
            keys = Object.keys(mouthTypes);
            break;
         case 9:
            keys = Object.keys(Avataaar.skinColors);
            break;
         case 10:
            keys = Object.keys(Avataaar.hairColors);
            break;
         case 11:
            keys = Object.keys(Avataaar.hatColors);
            break;
      }
      keys.sort();
      let index = keys.indexOf(this.state[what]);
      if (keys.length == 0 || index == -1 || index >= keys.length - 1) {
         return false;
      }
      let next = [...this.state];
      next[what] = keys[index + 1];
      return next;
   }

   // from https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript/7616484#7616484
   hash(str) {
      const hash = str
         .split("")
         .reduce((prevHash, currVal) => ((prevHash << 5) - prevHash + currVal.charCodeAt(0)) | 0, 0);
      return hash >= 0 ? hash : -hash;
   }

   randomOption(optionMap) {
      const options = Object.keys(optionMap);
      const index = this.random.nextInt(0, options.length);
      return options[index];
   }
   randomArrayOption(options) {
      const index = this.random.nextInt(0, options.length);
      return options[index];
   }

   set identifier(identifier) {
      this._identifier = identifier;
      const identifierSeed = this.hash(identifier);
      this.random = new Random(identifierSeed);

      this.properties(
         this.randomOption(noseTypes),
         this.randomOption(topTypes),
         this.randomOption(accessoriesTypes),
         this.randomOption(Avataaar.hairColors),
         this.randomOption(facialHairTypes),
         this.randomOption(clothesType),
         this.randomOption(eyeTypes),
         this.randomOption(eyebrowTypes),
         this.randomOption(mouthTypes),
         this.randomOption(Avataaar.skinColors),
         this.randomOption(Avataaar.hairColors),
         this.randomOption(Avataaar.hatColors)
      );
   }

   get identifier() {
      return this._identifier;
   }

   static get styles() {
      return `
      :host {
        display: inline-block;
        width: 64px;
        --avataaar-internal-circle-color: var(--avataaar-circle-color, #6fb8e0);
      }
    `;
   }

   render() {
      let svg = `
          <svg
        viewBox='0 0 264 280'
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlns:xlink='http://www.w3.org/1999/xlink'>
        <desc>Created with getavataaars.com</desc>
        <defs>
          <circle id='path-1' cx='120' cy='120' r='120' />
          <path
            d='M12,160 C12,226.27417 65.72583,280 132,280 C198.27417,280 252,226.27417 252,160 L264,160 L264,-1.42108547e-14 L-3.19744231e-14,-1.42108547e-14 L-3.19744231e-14,160 L12,160 Z'
            id='path-2'
          />
          <path
            d='M124,144.610951 L124,163 L128,163 L128,163 C167.764502,163 200,195.235498 200,235 L200,244 L0,244 L0,235 C-4.86974701e-15,195.235498 32.235498,163 72,163 L72,163 L76,163 L76,144.610951 C58.7626345,136.422372 46.3722246,119.687011 44.3051388,99.8812385 C38.4803105,99.0577866 34,94.0521096 34,88 L34,74 C34,68.0540074 38.3245733,63.1180731 44,62.1659169 L44,56 L44,56 C44,25.072054 69.072054,5.68137151e-15 100,0 L100,0 L100,0 C130.927946,-5.68137151e-15 156,25.072054 156,56 L156,62.1659169 C161.675427,63.1180731 166,68.0540074 166,74 L166,88 C166,94.0521096 161.51969,99.0577866 155.694861,99.8812385 C153.627775,119.687011 141.237365,136.422372 124,144.610951 Z'
            id='path-silhouette'
          />
        </defs>
        <g
          id='Avataaar'
          stroke='none'
          stroke-width='1'
          fill='none'
          fill-rule='evenodd'>
          <g
            transform='translate(-825.000000, -1100.000000)'
            id='Avataaar/Circle'>
            <g transform='translate(825.000000, 1100.000000)'>
                <g
                  id='Circle'
                  stroke-width='1'
                  fill-rule='evenodd'
                  transform='translate(12.000000, 40.000000)'>
                  <mask id='mask-1' fill='white'>
                    <use xlink:href='#path-1' />
                  </mask>
                  <use
                    id='Circle-Background'
                    fill='#E6E6E6'
                    xlink:href='#path-1'
                  />
                  <g
                    id='Color/Palette/Blue-01'
                    mask='url(#mask-1)'
                    fill='var(--avataaar-internal-circle-color)'>
                    <rect id='🖍Color' x='0' y='0' width='240' height='240' />
                  </g>
                </g>
                <mask id='mask-2' fill='white'>
                  <use xlink:href='#path-2' />
                </mask>
              <g id='Mask' />
              <g
                id='Avataaar'
                stroke-width='1'
                fill-rule='evenodd'
                fill='black'
                mask='url(#mask-2)'>
                <g id='Body' transform='translate(32.000000, 36.000000)'>
                  <mask id='mask-silhouette' fill='white'>
                    <use xlink:href='#path-silhouette' />
                  </mask>
                  <use fill='var(--avataaar-skin-color)' xlink:href='#path-silhouette' />
                  <path
                    d='M156,79 L156,102 C156,132.927946 130.927946,158 100,158 C69.072054,158 44,132.927946 44,102 L44,79 L44,94 C44,124.927946 69.072054,150 100,150 C130.927946,150 156,124.927946 156,94 L156,79 Z'
                    id='Neck-Shadow'
                    fillOpacity='0.100000001'
                    fill='#000000'
                    mask='url(#mask-silhouette)'
                  />
                </g>
                ${this.clotheType}
                ${this.eyebrowType}
                ${this.eyeType}
                ${this.mouthType}
                ${this.noseType}
                ${this.topType}
                ${this.facialHairType}
                ${this.accessoriesType}
              </g>
            </g>
          </g>
        </g>
      </svg>
`;
      for (const color in this.colors) {
         if (this.colors.hasOwnProperty(color)) {
            const value = this.colors[color];
            svg = svg.split(`var(${color})`).join(value);
         }
      }
      return svg;
   }
}
