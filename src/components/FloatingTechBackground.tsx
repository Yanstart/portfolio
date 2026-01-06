'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

// Comprehensive tech stack - IT, DevOps, Data Science, Biotech, Hardware, Science
const allTechnologies = [
  // Programming Languages
  { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg', color: '#3776AB', category: 'lang' },
  { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg', color: '#3178C6', category: 'lang' },
  { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg', color: '#F7DF1E', category: 'lang' },
  { name: 'Rust', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rust/rust-original.svg', color: '#000000', category: 'lang' },
  { name: 'Go', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg', color: '#00ADD8', category: 'lang' },
  { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg', color: '#ED8B00', category: 'lang' },
  { name: 'C++', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg', color: '#00599C', category: 'lang' },
  { name: 'C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/c/c-original.svg', color: '#A8B9CC', category: 'lang' },
  { name: 'R', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/r/r-original.svg', color: '#276DC3', category: 'data' },
  { name: 'Scala', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/scala/scala-original.svg', color: '#DC322F', category: 'lang' },
  { name: 'Julia', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/julia/julia-original.svg', color: '#9558B2', category: 'data' },
  { name: 'Lua', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/lua/lua-original.svg', color: '#2C2D72', category: 'lang' },

  // Frontend
  { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg', color: '#61DAFB', category: 'frontend' },
  { name: 'Next.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg', color: '#000000', category: 'frontend' },
  { name: 'Vue', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg', color: '#4FC08D', category: 'frontend' },
  { name: 'Angular', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg', color: '#DD0031', category: 'frontend' },
  { name: 'Svelte', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/svelte/svelte-original.svg', color: '#FF3E00', category: 'frontend' },
  { name: 'TailwindCSS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg', color: '#06B6D4', category: 'frontend' },
  { name: 'Sass', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg', color: '#CC6699', category: 'frontend' },

  // Backend
  { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg', color: '#339933', category: 'backend' },
  { name: 'FastAPI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg', color: '#009688', category: 'backend' },
  { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg', color: '#092E20', category: 'backend' },
  { name: 'Flask', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg', color: '#000000', category: 'backend' },
  { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg', color: '#000000', category: 'backend' },
  { name: 'GraphQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg', color: '#E10098', category: 'backend' },
  { name: 'NestJS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg', color: '#E0234E', category: 'backend' },

  // Databases
  { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg', color: '#336791', category: 'database' },
  { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg', color: '#47A248', category: 'database' },
  { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg', color: '#DC382D', category: 'database' },
  { name: 'MySQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg', color: '#4479A1', category: 'database' },
  { name: 'SQLite', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlite/sqlite-original.svg', color: '#003B57', category: 'database' },
  { name: 'Neo4j', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/neo4j/neo4j-original.svg', color: '#008CC1', category: 'database' },

  // DevOps & Cloud
  { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg', color: '#2496ED', category: 'devops' },
  { name: 'Kubernetes', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg', color: '#326CE5', category: 'devops' },
  { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg', color: '#FF9900', category: 'cloud' },
  { name: 'Azure', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg', color: '#0078D4', category: 'cloud' },
  { name: 'GCP', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg', color: '#4285F4', category: 'cloud' },
  { name: 'Terraform', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/terraform/terraform-original.svg', color: '#7B42BC', category: 'devops' },
  { name: 'Ansible', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ansible/ansible-original.svg', color: '#EE0000', category: 'devops' },
  { name: 'Jenkins', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg', color: '#D24939', category: 'devops' },
  { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg', color: '#F05032', category: 'devops' },
  { name: 'Linux', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg', color: '#FCC624', category: 'devops' },
  { name: 'Nginx', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg', color: '#009639', category: 'devops' },

  // Data Science & ML
  { name: 'TensorFlow', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg', color: '#FF6F00', category: 'ml' },
  { name: 'PyTorch', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg', color: '#EE4C2C', category: 'ml' },
  { name: 'Pandas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg', color: '#150458', category: 'data' },
  { name: 'NumPy', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg', color: '#013243', category: 'data' },
  { name: 'Jupyter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jupyter/jupyter-original.svg', color: '#F37626', category: 'data' },
  { name: 'Matplotlib', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg', color: '#11557C', category: 'data' },
  { name: 'OpenCV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg', color: '#5C3EE8', category: 'ml' },
  { name: 'Kaggle', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kaggle/kaggle-original.svg', color: '#20BEFF', category: 'data' },

  // Hardware & Embedded
  { name: 'Arduino', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/arduino/arduino-original.svg', color: '#00979D', category: 'hardware' },
  { name: 'Raspberry Pi', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/raspberrypi/raspberrypi-original.svg', color: '#C51A4A', category: 'hardware' },
  { name: 'Embedded C', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/embeddedc/embeddedc-original.svg', color: '#3C3C3D', category: 'hardware' },

  // Tools & IDEs
  { name: 'VS Code', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg', color: '#007ACC', category: 'tools' },
  { name: 'Vim', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vim/vim-original.svg', color: '#019733', category: 'tools' },
  { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg', color: '#F24E1E', category: 'tools' },
  { name: 'Postman', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg', color: '#FF6C37', category: 'tools' },
  { name: 'Blender', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/blender/blender-original.svg', color: '#F5792A', category: 'tools' },
  { name: 'Unity', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/unity/unity-original.svg', color: '#000000', category: 'tools' },

  // Messaging & APIs
  { name: 'RabbitMQ', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rabbitmq/rabbitmq-original.svg', color: '#FF6600', category: 'backend' },
  { name: 'Kafka', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apachekafka/apachekafka-original.svg', color: '#231F20', category: 'backend' },
  { name: 'Prometheus', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prometheus/prometheus-original.svg', color: '#E6522C', category: 'devops' },
  { name: 'Grafana', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/grafana/grafana-original.svg', color: '#F46800', category: 'devops' },
];

// Generate deterministic random values using seed
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000;
  return x - Math.floor(x);
}

// Generate float parameters for each tech
function generateFloatParams(index: number, total: number, seed: number) {
  const goldenAngle = 137.508;
  const angle = (index * goldenAngle * Math.PI) / 180;
  const radius = Math.sqrt(index / total);

  return {
    startX: 50 + radius * Math.cos(angle) * 45,
    startY: 50 + radius * Math.sin(angle) * 45,
    floatX: 20 + seededRandom(seed + index) * 40,
    floatY: 15 + seededRandom(seed + index + 100) * 30,
    duration: 20 + seededRandom(seed + index + 200) * 25,
    delay: seededRandom(seed + index + 300) * 5,
    scale: 0.6 + seededRandom(seed + index + 400) * 0.5,
    rotate: seededRandom(seed + index + 500) * 360,
    rotateAmount: (seededRandom(seed + index + 600) - 0.5) * 20,
  };
}

// SVG DNA/Neural Connection Component
function OrganicConnection({
  x1, y1, x2, y2, color1, color2, index
}: {
  x1: number; y1: number; x2: number; y2: number;
  color1: string; color2: string; index: number;
}) {
  // Guard against NaN/invalid values
  if (!isFinite(x1) || !isFinite(y1) || !isFinite(x2) || !isFinite(y2) ||
      x1 === 0 && y1 === 0 && x2 === 0 && y2 === 0) {
    return null;
  }

  // Calculate control points for organic bezier curve
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  // Guard against zero distance
  if (distance < 1) return null;

  // Add organic waviness based on distance
  const waveAmplitude = distance * 0.3;
  const perpX = -(y2 - y1) / distance;
  const perpY = (x2 - x1) / distance;

  const ctrl1X = midX + perpX * waveAmplitude * Math.sin(index);
  const ctrl1Y = midY + perpY * waveAmplitude * Math.sin(index);
  const ctrl2X = midX - perpX * waveAmplitude * Math.cos(index);
  const ctrl2Y = midY - perpY * waveAmplitude * Math.cos(index);

  const pathD = `M ${x1} ${y1} C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${x2} ${y2}`;
  const gradientId = `gradient-${index}`;

  return (
    <g>
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={color1} stopOpacity="0.4" />
          <stop offset="50%" stopColor="#0EA5E9" stopOpacity="0.6" />
          <stop offset="100%" stopColor={color2} stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Main connection line */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 1, 0],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: 8 + index % 5,
          repeat: Infinity,
          delay: index * 0.5,
          ease: "easeInOut",
        }}
      />
      {/* DNA helix effect - secondary strand */}
      <motion.path
        d={`M ${x1} ${y1} C ${ctrl2X} ${ctrl2Y}, ${ctrl1X} ${ctrl1Y}, ${x2} ${y2}`}
        fill="none"
        stroke={`url(#${gradientId})`}
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray="4 6"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{
          pathLength: [0, 1, 1, 0],
          opacity: [0, 0.3, 0.3, 0],
        }}
        transition={{
          duration: 8 + index % 5,
          repeat: Infinity,
          delay: index * 0.5 + 0.5,
          ease: "easeInOut",
        }}
      />
      {/* Pulse particles along the path */}
      <motion.circle
        r="3"
        fill={color1}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.8, 0],
          offsetDistance: ['0%', '100%'],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          delay: index * 0.3,
          ease: "linear",
        }}
        style={{ offsetPath: `path('${pathD}')` }}
      />
    </g>
  );
}

// Floating Tech Icon Component
function FloatingTechIcon({
  tech,
  params,
  index,
  onPositionUpdate
}: {
  tech: typeof allTechnologies[0];
  params: ReturnType<typeof generateFloatParams>;
  index: number;
  onPositionUpdate?: (index: number, x: number, y: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current && onPositionUpdate) {
      const updatePosition = () => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          onPositionUpdate(index, rect.left + rect.width / 2, rect.top + rect.height / 2);
        }
      };
      updatePosition();
      const interval = setInterval(updatePosition, 1000);
      return () => clearInterval(interval);
    }
  }, [index, onPositionUpdate]);

  return (
    <motion.div
      ref={ref}
      className="absolute pointer-events-none"
      style={{
        left: `${params.startX}%`,
        top: `${params.startY}%`,
      }}
      initial={{
        opacity: 0,
        scale: 0,
        rotate: params.rotate
      }}
      animate={{
        opacity: [0.1, 0.25, 0.1],
        scale: [params.scale * 0.9, params.scale * 1.1, params.scale * 0.9],
        x: [0, params.floatX, -params.floatX * 0.5, params.floatX * 0.7, 0],
        y: [0, -params.floatY, params.floatY * 0.8, -params.floatY * 0.5, 0],
        rotate: [params.rotate, params.rotate + params.rotateAmount, params.rotate - params.rotateAmount, params.rotate],
      }}
      transition={{
        opacity: { duration: params.duration, repeat: Infinity, ease: "easeInOut" },
        scale: { duration: params.duration * 0.8, repeat: Infinity, ease: "easeInOut" },
        x: { duration: params.duration, repeat: Infinity, ease: "easeInOut" },
        y: { duration: params.duration * 1.2, repeat: Infinity, ease: "easeInOut" },
        rotate: { duration: params.duration * 1.5, repeat: Infinity, ease: "easeInOut" },
        delay: params.delay,
      }}
      aria-hidden="true"
    >
      <div
        className="relative"
        style={{
          filter: `drop-shadow(0 0 12px ${tech.color}50)`,
        }}
      >
        {/* Using regular img tag to avoid LCP warnings for decorative background elements */}
        <img
          src={tech.icon}
          alt=""
          width={40}
          height={40}
          className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
          loading="lazy"
          decoding="async"
        />
        {/* Organic glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full blur-xl"
          style={{ backgroundColor: tech.color }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + index % 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
    </motion.div>
  );
}

// Neural network node pulses
function NeuralPulse({ x, y, color, delay }: { x: number; y: number; color: string; delay: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full pointer-events-none"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        backgroundColor: color,
        boxShadow: `0 0 20px ${color}, 0 0 40px ${color}50`,
      }}
      animate={{
        scale: [0, 1.5, 0],
        opacity: [0, 0.8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay,
        ease: "easeOut",
      }}
    />
  );
}

export default function FloatingTechBackground() {
  const [seed] = useState(() => Date.now());
  const [positions, setPositions] = useState<{ x: number; y: number }[]>([]);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  // Generate float parameters
  const floatParams = useMemo(() =>
    allTechnologies.map((_, index) => generateFloatParams(index, allTechnologies.length, seed)),
    [seed]
  );

  // Generate connections between nearby technologies
  const connections = useMemo(() => {
    const conns: { i: number; j: number }[] = [];
    const maxConnections = 25;

    for (let i = 0; i < allTechnologies.length && conns.length < maxConnections; i++) {
      for (let j = i + 1; j < allTechnologies.length && conns.length < maxConnections; j++) {
        const p1 = floatParams[i];
        const p2 = floatParams[j];
        const dist = Math.sqrt((p1.startX - p2.startX) ** 2 + (p1.startY - p2.startY) ** 2);

        // Connect nearby nodes
        if (dist < 25 && seededRandom(seed + i * j) > 0.5) {
          conns.push({ i, j });
        }
      }
    }
    return conns;
  }, [floatParams, seed]);

  // Neural pulse positions
  const pulsePositions = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      x: seededRandom(seed + i * 1000) * 100,
      y: seededRandom(seed + i * 2000) * 100,
      color: allTechnologies[i % allTechnologies.length].color,
      delay: i * 0.5,
    }));
  }, [seed]);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-primary)] via-[var(--bg-secondary)] to-[var(--bg-primary)]" />

      {/* Organic ambient glow */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--tech-blue) 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.05, 0.1, 0.05],
          x: [0, 50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, var(--western-gold) 0%, transparent 70%)' }}
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.03, 0.08, 0.03],
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, #10B981 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.02, 0.06, 0.02],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* SVG layer for organic connections */}
      <svg className="absolute inset-0 w-full h-full" style={{ minHeight: '100vh' }}>
        {connections.map(({ i, j }, idx) => (
          <OrganicConnection
            key={`conn-${i}-${j}`}
            x1={floatParams[i].startX * windowSize.width / 100}
            y1={floatParams[i].startY * windowSize.height / 100}
            x2={floatParams[j].startX * windowSize.width / 100}
            y2={floatParams[j].startY * windowSize.height / 100}
            color1={allTechnologies[i].color}
            color2={allTechnologies[j].color}
            index={idx}
          />
        ))}
      </svg>

      {/* Neural pulse effects */}
      {pulsePositions.map((pulse, i) => (
        <NeuralPulse key={`pulse-${i}`} {...pulse} />
      ))}

      {/* DNA helix decorative elements */}
      <svg className="absolute left-0 top-0 w-20 h-full opacity-10" viewBox="0 0 80 1000" preserveAspectRatio="none">
        <motion.path
          d="M40 0 Q60 50 40 100 Q20 150 40 200 Q60 250 40 300 Q20 350 40 400 Q60 450 40 500 Q20 550 40 600 Q60 650 40 700 Q20 750 40 800 Q60 850 40 900 Q20 950 40 1000"
          fill="none"
          stroke="var(--tech-blue)"
          strokeWidth="2"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M40 0 Q20 50 40 100 Q60 150 40 200 Q20 250 40 300 Q60 350 40 400 Q20 450 40 500 Q60 550 40 600 Q20 650 40 700 Q60 750 40 800 Q20 850 40 900 Q60 950 40 1000"
          fill="none"
          stroke="var(--western-gold)"
          strokeWidth="2"
          strokeDasharray="5 10"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
      </svg>

      <svg className="absolute right-0 top-0 w-20 h-full opacity-10" viewBox="0 0 80 1000" preserveAspectRatio="none">
        <motion.path
          d="M40 0 Q20 50 40 100 Q60 150 40 200 Q20 250 40 300 Q60 350 40 400 Q20 450 40 500 Q60 550 40 600 Q20 650 40 700 Q60 750 40 800 Q20 850 40 900 Q60 950 40 1000"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        <motion.path
          d="M40 0 Q60 50 40 100 Q20 150 40 200 Q60 250 40 300 Q20 350 40 400 Q60 450 40 500 Q20 550 40 600 Q60 650 40 700 Q60 750 40 800 Q20 850 40 900 Q60 950 40 1000"
          fill="none"
          stroke="var(--tech-cyan)"
          strokeWidth="2"
          strokeDasharray="5 10"
          animate={{ pathLength: [0, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear", delay: 0.5 }}
        />
      </svg>

      {/* Floating tech icons */}
      {allTechnologies.map((tech, index) => (
        <FloatingTechIcon
          key={tech.name}
          tech={tech}
          params={floatParams[index]}
          index={index}
        />
      ))}

      {/* Vignette overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--bg-primary)]/50 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,var(--bg-primary)_70%)] pointer-events-none opacity-40" />
    </div>
  );
}
