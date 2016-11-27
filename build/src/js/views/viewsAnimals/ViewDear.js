// ViewDear.js

import ViewAnimal from './ViewAnimal'
import Dear from '../../animals/Dear'

import vs from '../../../shaders/line.vert';
import fs from '../../../shaders/line.frag';

class ViewDear extends ViewAnimal {

	constructor(pos) {
		super(vs, fs, pos);
	}

	reset(pos){
		this.shape = new Dear(pos);
		super.reset(pos);
	}
	// _init(){
	//
	// }
}

export default ViewDear;
