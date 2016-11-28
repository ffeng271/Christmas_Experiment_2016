
// import Spline from './libs/Spline';
import glmatrix from 'gl-matrix';

class Bear {
  constructor(pos){
    this.vertices = [
      [389,507,0],[405,456,0],[425,424,0],[452,417,0],[469,425,0],[476,445,0],[484,484,0],[492,497,0],[512,501,0],[538,496,0],[546,490,0],[546,478,0],[542,443,0],[541,405,0],[550,345,0],[551,279,0],[545,215,0],[532,160,0],[511,125,0],[486,109,0],[447,95,0],[425,95,0],[414,108,0],[409,133,0],[413,218,0],[426,287,0],[434,295,0],[443,294,0],[439,290,0],[426,290,0],[422,294,0],[424,308,0],[426,339,0],[426,357,0],[419,368,0],[402,368,0],[394,363,0],[401,354,0],[411,353,0],[422,353,0],[426,358,0],[424,373,0],[414,387,0],[410,388,0],[398,384,0],[389,371,0],[383,354,0],[344,319,0],[327,288,0],[323,262,0],[329,234,0],[332,212,0],[329,192,0],[334,183,0],[349,185,0],[370,199,0],[376,209,0],[376,218,0],[362,225,0],[340,224,0],[334,220,0],[349,212,0],[393,205,0],[429,207,0],[461,211,0],[472,216,0],[467,222,0],[452,224,0],[435,218,0],[428,211,0],[452,181,0],[468,174,0],[478,180,0],[484,195,0],[486,244,0],[481,280,0],[474,301,0],[460,316,0],[451,332,0],[443,356,0],[438,376,0],[425,390,0],[400,392,0],[382,382,0],[376,374,0],[358,457,0],[360,474,0],[357,481,0],[299,487,0],[289,482,0],[288,473,0],[297,452,0],[299,429,0],[285,353,0],[288,306,0],[314,190,0],[322,170,0],[353,121,0],[386,89,0],[413,84,0],[439,86,0],[451,88,0],[475,80,0],[517,82,0],[565,101,0],[601,133,0],[634,171,0],[665,227,0],[681,279,0],[692,314,0],[713,372,0],[730,407,0],[735,428,0],[734,453,0],[728,470,0],[719,479,0],[669,477,0],[659,472,0],[663,421,0],[652,395,0],[614,364,0],[584,358,0],[577,358,0],[567,366,0],[546,377,0],[498,379,0],[469,371,0],[446,348,0],[443,327,0],[449,290,0],[472,238,0],[512,179,0],[558,140,0],[604,126,0],[632,128,0],[670,144,0],[701,166,0]
    ]

    let minX = 10000;
    let maxX = 0;

    let minY = 10000;
    let maxY = 0;

    for (var i = 0; i < this.vertices.length; i++) {
      let v = this.vertices[i];
      if(v[0] < minX) minX = v[0]
      if(v[0] > maxX) maxX = v[0]

      if(v[1] < minY) minY = v[1]
      if(v[1] > maxY) maxY = v[1]
    }

    let wX = maxX - minX;
    let wY = maxY - minY;
    let w = Math.max(wX, wY)

    this.tick = 0;

    for (var i = 0; i < this.vertices.length; i++) {

			this.tick++;

			this.vertices[i][0] /= (w / 2);
			// this.vertices[i][0] *= 2;
			this.vertices[i][1] /= (w/2);
			// this.vertices[i][1] *= 2;
			this.vertices[i][2] = Math.cos(this.tick/10) * .4;
			// this.vertices[i][0] -= 2;
			this.vertices[i][1] -= 1.8;
			this.vertices[i][0] -= 1;
		}




    this.position = pos || [0,-3, 0];
    this.m = glmatrix.mat4.create();
    this.mRX = glmatrix.mat4.create();
    this.mRY = glmatrix.mat4.create();


    // console.log(this.mR);
  }

  rotateX(rx){
    // console.log("here", rx);
		glmatrix.mat4.scalar.rotateX(this.mRX, this.mRX, rx + Math.PI/2)
	}

	rotateY(ry){
    // console.log("here", ry);
		glmatrix.mat4.scalar.rotateY(this.mRY, this.mRY, ry - Math.PI/2)
	}

  getPoints(){
    let v = this.vertices.slice();

    // glmatrix.mat4.translate(this.m, this.m,  this.position);
    // glmatrix.mat4.scalar.rotateY(this.m, this.m, Math.PI)

    glmatrix.mat4.multiply(this.m, this.mRX, this.mRY);

    for (var i = 0; i < v.length; i++) {
      // console.log(v[i]);
      glmatrix.vec3.transformMat4(v[i], v[i], this.m);
      // console.log(v[i]);
    }


    return v;
  }
}

export default Bear;
