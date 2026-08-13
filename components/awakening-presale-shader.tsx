"use client"

export function AwakeningPresaleShader() {
  return (
    <div 
      className="fixed inset-0 -z-10"
      style={{
        background: "linear-gradient(180deg, #f4a460 0%, #ffd699 25%, #fff5e6 40%, #b8a8d8 60%, #6b5b95 80%, #3d2f5c 100%)",
        backgroundSize: "100% 200%",
        animation: "gradientShift 8s ease-in-out infinite",
      }}
    >
      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 0% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
      `}</style>
    </div>
  )
}
