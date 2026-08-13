"use client"

import { useEffect, useRef, useState } from "react"

export function DotShaderBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const mousePos = useRef({ x: 0.5, y: 0.5 })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)

    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl")
    if (!gl) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `

    // Fragment shader with 45-degree blue dots
    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      vec2 rotate(vec2 uv, float angle) {
        float s = sin(angle);
        float c = cos(angle);
        mat2 rotationMatrix = mat2(c, -s, s, c);
        return rotationMatrix * (uv - 0.5) + 0.5;
      }

      float sdfCircle(vec2 p, float r) {
        return length(p - 0.5) - r;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution;
        
        // Rotate by 45 degrees (PI/4)
        float angle = 3.14159265 / 4.0;
        vec2 rotatedUv = rotate(uv, angle);
        
        // Grid settings
        float gridSize = 30.0;
        vec2 gridUv = fract(rotatedUv * gridSize);
        vec2 gridId = floor(rotatedUv * gridSize);
        
        // Animate dots
        float wave = sin(u_time * 2.0 + gridId.x * 0.3 + gridId.y * 0.3) * 0.5 + 0.5;
        
        // Mouse influence
        vec2 mouseInfluence = u_mouse - uv;
        float mouseDist = length(mouseInfluence);
        float mouseEffect = smoothstep(0.4, 0.0, mouseDist) * 0.5;
        
        // Base dot
        float dotSize = 0.08 + wave * 0.06 + mouseEffect * 0.1;
        float dot = sdfCircle(gridUv, dotSize);
        float dotMask = 1.0 - smoothstep(0.0, 0.02, dot);
        
        // Blue color palette
        vec3 darkBlue = vec3(0.02, 0.04, 0.12);
        vec3 brightBlue = vec3(0.2, 0.5, 1.0);
        vec3 lightBlue = vec3(0.4, 0.7, 1.0);
        
        // Color variation based on wave and position
        vec3 dotColor = mix(brightBlue, lightBlue, wave);
        dotColor = mix(dotColor, lightBlue * 1.5, mouseEffect);
        
        // Background gradient
        float vignette = 1.0 - length(uv - 0.5) * 0.8;
        vec3 bgColor = darkBlue * vignette;
        
        // Combine
        vec3 finalColor = mix(bgColor, dotColor, dotMask * (0.4 + wave * 0.3));
        
        // Add subtle glow around dots
        float glow = smoothstep(0.15, 0.0, dot) * 0.15 * wave;
        finalColor += brightBlue * glow;
        
        // Add grain to reduce banding
        float grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453) * 0.03 - 0.015;
        finalColor += grain;
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `

    // Compile shaders
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type)!
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)

    // Create program
    const program = gl.createProgram()!
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    gl.useProgram(program)

    // Set up geometry (full-screen quad)
    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1])
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW)

    const positionLocation = gl.getAttribLocation(program, "a_position")
    gl.enableVertexAttribArray(positionLocation)
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0)

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution")
    const timeLocation = gl.getUniformLocation(program, "u_time")
    const mouseLocation = gl.getUniformLocation(program, "u_mouse")

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!isMobile) {
        mousePos.current = {
          x: e.clientX / window.innerWidth,
          y: 1.0 - e.clientY / window.innerHeight,
        }
      }
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Animation loop
    let animationFrame: number
    const startTime = Date.now()

    const render = () => {
      const time = (Date.now() - startTime) / 1000

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
      gl.uniform1f(timeLocation, time)
      gl.uniform2f(mouseLocation, mousePos.current.x, mousePos.current.y)

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      animationFrame = requestAnimationFrame(render)
    }
    render()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrame)
    }
  }, [isMobile])

  return (
    <div className="absolute inset-0 -z-10">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}
