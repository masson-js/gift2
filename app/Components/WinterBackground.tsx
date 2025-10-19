export function WinterBackground() {
  // Generate gift positions
  const gifts = [
    // Back row gifts (smaller, higher up)
    { x: 100, y: 450, size: 25, color: '#DC2626', ribbon: '#FCD34D', rotation: -5 },
    { x: 220, y: 470, size: 30, color: '#10B981', ribbon: '#FDE047', rotation: 8 },
    { x: 350, y: 460, size: 28, color: '#3B82F6', ribbon: '#FBBF24', rotation: -3 },
    { x: 480, y: 455, size: 26, color: '#8B5CF6', ribbon: '#34D399', rotation: 10 },
    { x: 600, y: 465, size: 29, color: '#EC4899', ribbon: '#FCD34D', rotation: -7 },
    { x: 720, y: 450, size: 27, color: '#F59E0B', ribbon: '#FDE047', rotation: 5 },
    { x: 850, y: 475, size: 31, color: '#14B8A6', ribbon: '#FCD34D', rotation: -8 },
    { x: 980, y: 460, size: 28, color: '#EF4444', ribbon: '#FDE047', rotation: 6 },
    { x: 1100, y: 470, size: 30, color: '#06B6D4', ribbon: '#FBBF24', rotation: -4 },
    
    // Middle row gifts
    { x: 80, y: 550, size: 35, color: '#DC2626', ribbon: '#FCD34D', rotation: 7 },
    { x: 180, y: 560, size: 40, color: '#10B981', ribbon: '#FDE047', rotation: -5 },
    { x: 280, y: 540, size: 38, color: '#3B82F6', ribbon: '#FBBF24', rotation: 9 },
    { x: 400, y: 570, size: 42, color: '#8B5CF6', ribbon: '#34D399', rotation: -6 },
    { x: 520, y: 555, size: 37, color: '#EC4899', ribbon: '#FCD34D', rotation: 4 },
    { x: 650, y: 565, size: 45, color: '#F59E0B', ribbon: '#FDE047', rotation: -8 },
    { x: 770, y: 545, size: 39, color: '#14B8A6', ribbon: '#FCD34D', rotation: 7 },
    { x: 900, y: 560, size: 41, color: '#EF4444', ribbon: '#FDE047', rotation: -5 },
    { x: 1020, y: 550, size: 38, color: '#06B6D4', ribbon: '#FBBF24', rotation: 6 },
    { x: 1130, y: 570, size: 43, color: '#A855F7', ribbon: '#FDE047', rotation: -7 },
    
    // Front row gifts (larger)
    { x: 120, y: 650, size: 50, color: '#DC2626', ribbon: '#FCD34D', rotation: -6 },
    { x: 250, y: 670, size: 48, color: '#10B981', ribbon: '#FDE047', rotation: 8 },
    { x: 380, y: 660, size: 52, color: '#3B82F6', ribbon: '#FBBF24', rotation: -4 },
    { x: 510, y: 675, size: 55, color: '#8B5CF6', ribbon: '#34D399', rotation: 7 },
    { x: 640, y: 665, size: 53, color: '#EC4899', ribbon: '#FCD34D', rotation: -5 },
    { x: 770, y: 680, size: 49, color: '#F59E0B', ribbon: '#FDE047', rotation: 9 },
    { x: 900, y: 670, size: 51, color: '#14B8A6', ribbon: '#FCD34D', rotation: -7 },
    { x: 1030, y: 675, size: 54, color: '#EF4444', ribbon: '#FDE047', rotation: 6 },
    { x: 1150, y: 665, size: 50, color: '#06B6D4', ribbon: '#FBBF24', rotation: -8 },
  ];

  return (
    <div className="fixed inset-0 z-0">
      {/* Sky gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-400 via-blue-300 to-blue-100" />
      
      {/* Stars */}
      <div className="absolute inset-0">
        {[...Array(40)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              top: `${Math.random() * 50}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              opacity: 0.7,
            }}
          />
        ))}
      </div>

      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Multiple layers of snow drifts */}
        
        {/* Back snow layer */}
        <path
          d="M 0 400 Q 100 380 200 390 T 400 385 T 600 395 T 800 380 T 1000 390 T 1200 385 L 1200 800 L 0 800 Z"
          fill="#E0F2FE"
          opacity="0.6"
        />
        
        {/* Snow drifts - back */}
        <g opacity="0.5">
          {[100, 300, 500, 700, 900, 1100].map((x, i) => (
            <ellipse key={`back-drift-${i}`} cx={x} cy={480} rx={120} ry={40} fill="white" />
          ))}
        </g>

        {/* Middle snow layer */}
        <path
          d="M 0 500 Q 120 490 240 500 T 480 495 T 720 505 T 960 490 T 1200 500 L 1200 800 L 0 800 Z"
          fill="#F0F9FF"
        />

        {/* Snow drifts - middle */}
        <g>
          {[80, 220, 380, 540, 700, 860, 1020, 1160].map((x, i) => (
            <ellipse key={`mid-drift-${i}`} cx={x} cy={590} rx={100} ry={35} fill="white" opacity="0.7" />
          ))}
        </g>

        {/* Front snow layer */}
        <path
          d="M 0 600 Q 150 590 300 600 T 600 595 T 900 605 T 1200 595 L 1200 800 L 0 800 Z"
          fill="white"
        />

        {/* Snow drifts - foreground */}
        <g>
          {[100, 250, 400, 550, 700, 850, 1000, 1150].map((x, i) => (
            <ellipse key={`front-drift-${i}`} cx={x} cy={700} rx={120} ry={45} fill="#F0F9FF" />
          ))}
        </g>

        {/* All the gifts */}
        {gifts.map((gift, index) => (
          <g key={`gift-${index}`} transform={`translate(${gift.x}, ${gift.y}) rotate(${gift.rotation})`}>
            {/* Gift box */}
            <rect 
              x={-gift.size / 2} 
              y={-gift.size / 2} 
              width={gift.size} 
              height={gift.size} 
              fill={gift.color} 
              rx="3"
              stroke="#00000020"
              strokeWidth="2"
            />
            {/* Horizontal ribbon */}
            <rect 
              x={-gift.size / 2} 
              y={-gift.size * 0.1} 
              width={gift.size} 
              height={gift.size * 0.2} 
              fill={gift.ribbon}
            />
            {/* Vertical ribbon */}
            <rect 
              x={-gift.size * 0.1} 
              y={-gift.size / 2} 
              width={gift.size * 0.2} 
              height={gift.size} 
              fill={gift.ribbon}
            />
            {/* Bow */}
            <circle 
              cx={-gift.size * 0.25} 
              cy={-gift.size * 0.6} 
              r={gift.size * 0.2} 
              fill={gift.ribbon}
            />
            <circle 
              cx={gift.size * 0.25} 
              cy={-gift.size * 0.6} 
              r={gift.size * 0.2} 
              fill={gift.ribbon}
            />
            <circle 
              cx={0} 
              cy={-gift.size * 0.6} 
              r={gift.size * 0.15} 
              fill={gift.ribbon}
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
