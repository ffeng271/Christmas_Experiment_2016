// SceneApp.js

import alfrid, { Scene, GL } from 'alfrid';
import ViewTerrain from './ViewTerrain';
import ViewLine from './ViewLine';
import ViewWater from './ViewWater';
import ViewRender from './ViewRender';
import ViewSim from './ViewSim';
import ViewSave from './ViewSave';
import Params from './Params';

const RAD = Math.PI / 180;

class SceneApp extends alfrid.Scene {
	constructor() {
		super();
		GL.enableAlphaBlending();
		this._count = 0;
		const FOV = 45 * RAD;

		this.camera.setPerspective(Math.PI/4, GL.aspectRatio, .1, 200);
		this.orbitalControl.radius.value = 7;
		this.orbitalControl.rx.value = 0.3;
		this.orbitalControl.center[1] = 2;
		this.orbitalControl.rx.limit(0.3, Math.PI/2 - 0.1);
		this.orbitalControl.radius.limit(3, 30);


		this.cameraReflection = new alfrid.CameraPerspective();
		this.cameraReflection.setPerspective(FOV, GL.aspectRatio, .1, 100);
	}

	_initTextures() {
		let irr_posx = alfrid.HDRLoader.parse(getAsset('irr_posx'));
		let irr_negx = alfrid.HDRLoader.parse(getAsset('irr_negx'));
		let irr_posy = alfrid.HDRLoader.parse(getAsset('irr_posy'));
		let irr_negy = alfrid.HDRLoader.parse(getAsset('irr_negy'));
		let irr_posz = alfrid.HDRLoader.parse(getAsset('irr_posz'));
		let irr_negz = alfrid.HDRLoader.parse(getAsset('irr_negz'));

		this._textureIrr = new alfrid.GLCubeTexture([irr_posx, irr_negx, irr_posy, irr_negy, irr_posz, irr_negz]);
		this._textureRad = alfrid.GLCubeTexture.parseDDS(getAsset('radiance'));
		this._textureStar = new alfrid.GLTexture(getAsset('starsmap'));

		this._fboReflection = new alfrid.FrameBuffer(GL.width, GL.height);


		//	PARTICLES
		const numParticles = Params.numParticles;
		const o = {
			minFilter:GL.NEAREST,
			magFilter:GL.NEAREST
		};

		this._fboCurrent  	= new alfrid.FrameBuffer(numParticles, numParticles, o, true);
		this._fboTarget  	= new alfrid.FrameBuffer(numParticles, numParticles, o, true);
	}


	_initViews() {
		this._bCopy = new alfrid.BatchCopy();
		this._bSky = new alfrid.BatchSky();

		this._vRender = new ViewRender();
		this._vSim 	  = new ViewSim();
		this._vTerrain = new ViewTerrain();
		this._vWater = new ViewWater();


		this._vSave = new ViewSave();
		GL.setMatrices(this.cameraOrtho);


		this._fboCurrent.bind();
		GL.clear(0, 0, 0, 0);
		this._vSave.render();
		this._fboCurrent.unbind();

		this._fboTarget.bind();
		GL.clear(0, 0, 0, 0);
		this._vSave.render();
		this._fboTarget.unbind();

		GL.setMatrices(this.camera);

	}

	updateFbo() {
		this._fboTarget.bind();
		GL.clear(0, 0, 0, 1);
		this._vSim.render(this._fboCurrent.getTexture(1), this._fboCurrent.getTexture(0), this._fboCurrent.getTexture(2));
		this._fboTarget.unbind();


		let tmp          = this._fboCurrent;
		this._fboCurrent = this._fboTarget;
		this._fboTarget  = tmp;
	}


	render() {
		const { eye, center } = this.camera;
		let distToWater       = eye[1] - Params.seaLevel;
		const eyeRef          = [eye[0], eye[1] - distToWater * 2.0, eye[2]];
		distToWater           = center[1] - Params.seaLevel;
		const centerRef       = [center[0], center[1] - distToWater * 2.0, center[2]];
		this.cameraReflection.lookAt(eyeRef, centerRef);


		this._count ++;
		if(this._count % Params.skipCount == 0) {
			this._count = 0;
			this.updateFbo();
		}

		Params.clipY = Params.seaLevel;

		GL.clear(0, 0, 0, 0);
		
		this._fboReflection.bind();
		GL.clear(0, 0, 0, 0);
		Params.clipDir = -1;
		GL.setMatrices(this.cameraReflection);
		this._renderScene();
		this._fboReflection.unbind();

		Params.clipY = 999;
		Params.clipDir = 1;
		GL.setMatrices(this.camera);
		this._renderScene(true);

		const size = 256;
		GL.viewport(0, 0, size, size/GL.aspectRatio);
		// this._bCopy.draw(this._fboReflection.getTexture());
	}


	_renderScene(withWater=false) {
		this._bSky.draw(this._textureStar);
		if(withWater) {
			this._vWater.render(this._fboReflection.getTexture());	
		}
		this._vTerrain.render(this._textureRad, this._textureIrr);
		

		let p = this._count / Params.skipCount;
		GL.enableAdditiveBlending();
		this._vRender.render(this._fboTarget.getTexture(0), this._fboCurrent.getTexture(0), p, this._fboCurrent.getTexture(2));
		GL.enableAlphaBlending();
	}


	resize() {
		GL.setSize(window.innerWidth, window.innerHeight);
		this.camera.setAspectRatio(GL.aspectRatio);
	}
}


export default SceneApp;