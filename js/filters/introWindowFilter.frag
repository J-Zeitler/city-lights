precision mediump float;

varying vec2 vTextureCoord;

uniform vec2 resolution;
uniform sampler2D uSampler;

uniform float litRatio;

void main(void) {
  vec4 tex = texture2D(uSampler, vTextureCoord);
  gl_FragColor = tex*litRatio;
}
