// trees.vert

precision highp float;
attribute vec3 aVertexPosition;
attribute vec2 aTextureCoord;
attribute vec3 aNormal;

uniform mat4 uModelMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform mat3 uNormalMatrix;
uniform mat3 uModelViewMatrixInverse;

varying vec2 vTextureCoord;
varying vec3 vNormal;
varying vec3 vPosition;
varying vec3 vWsPosition;
varying vec3 vEyePosition;
varying vec3 vWsNormal;

void main(void) {
	vec3 position = aVertexPosition;

    vec4 worldSpacePosition	= uModelMatrix * vec4(position, 1.0);
    vec4 viewSpacePosition	= uViewMatrix * worldSpacePosition;
    
    vPosition				= viewSpacePosition.xyz;
    vWsPosition				= worldSpacePosition.xyz;
    
    vec4 eyeDirViewSpace	= viewSpacePosition - vec4( 0, 0, 0, 1 );
    vEyePosition			= -vec3( uModelViewMatrixInverse * eyeDirViewSpace.xyz );

	vec3 N  = aNormal * 0.0001;
	N       += normalize(vec3(aVertexPosition.x, 0.0, aVertexPosition.z));
	vNormal = N;

	vWsNormal				= normalize( uModelViewMatrixInverse * vNormal );
	
	gl_Position				= uProjectionMatrix * viewSpacePosition;

	vTextureCoord = aTextureCoord;
}