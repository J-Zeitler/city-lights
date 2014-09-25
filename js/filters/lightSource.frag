precision mediump float;

varying vec2 vTextureCoord;

uniform vec2 resolution;
uniform sampler2D uSampler;

uniform float radius;
uniform vec2 position;

vec2 texToPos (vec2 tex) {
  return vec2(tex.x*resolution.x, tex.y*resolution.y);
}

vec2 posToTex (vec2 pos) {
  return vec2(pos.x/resolution.x, pos.y/resolution.y);
}

void main(void) {
  vec2 samplePos = texToPos(vTextureCoord);

  vec2 toCenterPos = position - samplePos;
  float d = length(toCenterPos);
  if (d > radius) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  } else {
    vec2 toCenterTex = posToTex(toCenterPos);
    vec2 posTex = posToTex(position);

    bool lit = true;

    // Raycast :|
    vec4 lightColor = vec4(1.0, 1.0, 0.3, 0.7);
    for (float i = 0.0; i < 1.0; i += 0.005) {
      vec4 sample = texture2D(uSampler, vTextureCoord + toCenterTex*i);
      lightColor.a *= sample.r;
    }

    lightColor.a *= 1.0 - (d/radius)*(d/radius);
    gl_FragColor = lightColor;
  }
}
