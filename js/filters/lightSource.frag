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
float getAngleBetween(float target, float angle1, float angle2) {
  float PI = 3.1415;

  float diff = abs(angle2 - angle1);
  if (diff < 0.1 || diff > 1.9*PI) {
    return 1.0;
  }

  float rAngle = mod((mod((angle2 - angle1),(2.0*PI)) + 2.0*PI), 2.0*PI);

  float blur = 20.0;

  // through zero?
  if (angle1 <= angle2)
    return min(
      clamp((target - angle1)*blur, 0.0, 1.0),
      clamp((angle2 - target)*blur, 0.0, 1.0)
    );
  else if (target >= angle1) {
    return clamp((target - angle1)*blur, 0.0, 1.0);
  } else { // target <= angle2 ?
    return clamp((angle2 - target)*blur, 0.0, 1.0);
  }
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

  float angleBetween = getAngleBetween(sampleAngle, handlesRot.x, handlesRot.y);

  // Check if inside cone
  vec4 lightColor = texture2D(uSampler, vTextureCoord);
  lightColor.a = 0.7*angleBetween;
  lightColor.b *= 0.7;
  if (d > radius || lightColor.a < 0.1) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  } else {
    vec2 toCenterTex = posToTex(toCenterPos);
    vec2 posTex = posToTex(position);

    bool lit = true;

    // Raycast :|
    for (float i = 0.0; i < 1.0; i += 0.005) {
      vec4 sample = texture2D(uSampler, vTextureCoord + toCenterTex*i);
      lightColor.a *= (sample.a + 0.01);
    }

    lightColor.a *= 1.0 - (d/radius)*(d/radius);
    gl_FragColor = lightColor;
  }
}
