import Animal from './Animal';

class Wolf extends Animal {
  constructor(pos){
    let v = [
      [426, 491, 0],[416, 473, 0],[430, 448, 0],[478, 417, 0],[488, 406, 0],[492, 379, 0],[498, 345, 0],[507, 312, 0],[503, 290, 0],[479, 295, 0],[477, 311, 0],[478, 348, 0],[480, 384, 0],[475, 401, 0],[460, 414, 0],[473, 417, 0],[491, 406, 0],[502, 373, 0],[511, 348, 0],[515, 334, 0],[505, 324, 0],[484, 305, 0],[470, 273, 0],[460, 193, 0],[471, 157, 0],[485, 132, 0],[493, 116, 0],[494, 97, 0],[499, 91, 0],[500, 98, 0],[501, 110, 0],[505, 108, 0],[507, 95, 0],[512, 82, 0],[526, 76, 0],[530, 80, 0],[524, 83, 0],[523, 78, 0],[529, 78, 0],[526, 114, 0],[530, 127, 0],[532, 138, 0],[524, 159, 0],[525, 175, 0],[532, 185, 0],[532, 192, 0],[520, 188, 0],[508, 173, 0],[512, 140, 0],[520, 125, 0],[533, 129, 0],[541, 145, 0],[541, 159, 0],[555, 175, 0],[556, 182, 0],[540, 184, 0],[530, 178, 0],[531, 171, 0],[539, 180, 0],[550, 198, 0],[588, 234, 0],[632, 300, 0],[645, 359, 0],[655, 448, 0],[658, 460, 0],[639, 459, 0],[640, 448, 0],[630, 403, 0],[608, 360, 0],[578, 334, 0],[540, 329, 0],[505, 320, 0],[487, 297, 0],[489, 274, 0],[502, 268, 0],[517, 273, 0],[551, 315, 0],[563, 354, 0],[575, 384, 0],[603, 414, 0],[601, 442, 0],[592, 458, 0],[578, 465, 0],[577, 469, 0],[598, 473, 0],[620, 438, 0],[625, 418, 0],[615, 401, 0],[607, 358, 0],[609, 324, 0],[621, 298, 0],[632, 301, 0],[649, 358, 0],[662, 404, 0],[659, 415, 0],[649, 422, 0],[632, 418, 0],[623, 407, 0],[628, 403, 0],[645, 416, 0],[674, 445, 0],[709, 467, 0]
    ]

    super(v, pos || [0, -3, 0], [[515, 124, 0]])


  }
}

export default Wolf;
