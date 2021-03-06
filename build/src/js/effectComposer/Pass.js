// Pass.js

import alfrid, { GLShader, FrameBuffer, ShaderLibs } from 'alfrid';

class Pass {
	constructor(mSource, mWidth = 0, mHeight = 0, mParmas = {}) {
		this.shader = new alfrid.GLShader(alfrid.ShaderLibs.bigTriangleVert, mSource);

		this._width = mWidth;
		this._height = mHeight;
		this._uniforms = {};
		this._hasOwnFbo = this._width > 0 && this._width > 0;
		this._textures = [];

		if (this._hasOwnFbo) {
			this._fbo = new FrameBuffer(this._width, this.height, mParmas);
		}
	}


	uniform(mName, mType, mValue) {
		if(this._uniforms[mName]) {
			this._uniforms[mName].value = mValue;
		} else {
			this._uniforms[mName] = { type: mType, value:mValue };
		}
	}

	bindTexture(mName, mTexture) {

		const o = {
			name:mName,
			texture:mTexture
		}

		this._textures.push(o);
	}


	render(texture) {
		this.shader.bind();
		this.shader.uniform('texture', 'uniform1i', 0);
		texture.bind(0);
		for(const s in this._uniforms) {
			const oUni = this._uniforms[s];
			this.shader.uniform(s, oUni.type, oUni.value);
		}

		for(let i=0; i<this._textures.length; i++) {
			const o = this._textures[i];
			this.shader.uniform(o.name, "uniform1i", i+1);
			o.texture.bind(i+1);
		}
	}


	get width() {	return this._width;	}
	get height() {	return this._height;	}
	get fbo() {	return this._fbo;	}
	get hasFbo() {	return this._hasOwnFbo; }
	
}


export default Pass;