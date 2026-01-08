// GLSL Shaders for One Piece Globe

export const globeVertexShader = `
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const globeFragmentShader = `
uniform sampler2D globeTexture;
uniform vec3 sunPosition;
varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec3 viewDirection = normalize(-vPosition); // Camera is at (0,0,0) in view space
    vec3 normal = normalize(vNormal);
    vec3 sunDir = normalize(sunPosition);

    // Day/Night cycle base
    float intensity = dot(normal, sunDir);
    
    // Texture color
    vec3 color = texture2D(globeTexture, vUv).rgb;
    
    // Atmospheric glow
    float atmosphere = pow(0.6 - dot(normal, viewDirection), 3.0);
    vec3 atmosphereColor = vec3(0.3, 0.6, 1.0) * atmosphere * 1.5;

    // Specular ocean reflection
    vec3 reflection = reflect(-sunDir, normal);
    float specular = pow(max(0.0, dot(viewDirection, reflection)), 32.0) * 0.5;

    // Combine
    vec3 finalColor = color * (max(intensity, 0.1) + 0.2) + atmosphereColor + specular;
    
    gl_FragColor = vec4(finalColor, 1.0);
}
`;

export const atmosphereVertexShader = `
varying vec3 vNormal;

void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

export const atmosphereFragmentShader = `
varying vec3 vNormal;

void main() {
    float intensity = pow(0.65 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
    gl_FragColor = vec4(0.3, 0.6, 1.0, 1.0) * intensity * 1.5;
}
`;
