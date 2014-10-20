precision mediump float;

varying vec2 vTextureCoord;

uniform vec2 resolution;
uniform sampler2D uSampler;

uniform float litRatio;

void main(void) {
  vec4 tex = texture2D(uSampler, vTextureCoord);
  vec4 darkSky = vec4(0.1, 0.1, 0.2, 1.0);
  gl_FragColor = mix(
    darkSky*(vTextureCoord.y),
    tex*(vTextureCoord.y - 0.1),
    litRatio
  );
}
