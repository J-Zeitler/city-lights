precision mediump float;

varying vec2 vTextureCoord;

uniform vec2 resolution;
uniform sampler2D uSampler;

uniform float radius;
uniform vec2 position;
uniform vec2 handlesRot;

vec2 texToPos (vec2 tex) {
  return vec2(tex.x*resolution.x, tex.y*resolution.y);
}

vec2 posToTex (vec2 pos) {
  return vec2(pos.x/resolution.x, pos.y/resolution.y);
}

/**
 * From:
 * http://stackoverflow.com/questions/11406189/determine-if-angle-lies-between-2-other-angles
 */
bool is_angle_between(float target, float angle1, float angle2) {
  float PI = 3.1415;
  float rAngle = mod((mod((angle2 - angle1),(2.0*PI)) + 2.0*PI), 2.0*PI);

  // through zero?
  if (angle1 <= angle2)
    return target >= angle1 && target <= angle2;
  else
    return target >= angle1 || target <= angle2;
}

void main(void) {
  vec2 samplePos = texToPos(vTextureCoord);
  vec2 toCenterPos = position - samplePos;
  float d = length(toCenterPos);

  vec2 toSampleNorm = -normalize(toCenterPos);
  float sampleAngle = acos(toSampleNorm.x);
  if (toSampleNorm.y > 0.0) {
    sampleAngle = 2.0*3.14 - sampleAngle;
  }

  bool angleBetween = is_angle_between(sampleAngle, handlesRot.x, handlesRot.y);

  // Check if inside cone
  if (d > radius || !angleBetween) {
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
