import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        let mouse = { x: null, y: null };

        // Handle touch and mouse events
        const updateMouse = (x, y) => {
            mouse.x = x;
            mouse.y = y;
        }

        const handleMouseMove = (event) => updateMouse(event.clientX, event.clientY);
        const handleTouchMove = (event) => {
            if (event.touches.length > 0) {
                updateMouse(event.touches[0].clientX, event.touches[0].clientY);
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('mouseleave', () => { mouse.x = null; mouse.y = null; });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                // Slower, more organic velocity
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                // Larger size
                this.size = Math.random() * 4 + 2; // 2 to 6px
                this.baseSize = this.size;

                // Color: Teal/Cyan shades
                const colors = ['rgba(14, 116, 144, ', 'rgba(34, 211, 238, ', 'rgba(255, 255, 255, '];
                this.baseColor = colors[Math.floor(Math.random() * colors.length)];
                this.alpha = Math.random() * 0.5 + 0.2;

                // For wave motion
                this.angle = Math.random() * Math.PI * 2;
                this.angleSpeed = Math.random() * 0.02 + 0.01;
            }

            update() {
                // Wave/Pulse effect
                this.angle += this.angleSpeed;
                // Oscillate size slightly for "breathing"
                this.size = this.baseSize + Math.sin(this.angle) * 1;

                // Determine target - either mouse or roam
                if (mouse.x != null && mouse.y != null) {
                    const dx = mouse.x - this.x;
                    const dy = mouse.y - this.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    // Interaction radius
                    const maxDist = 400;
                    if (distance < maxDist) {
                        // Buffer zone: Don't let them get too close (e.g., < 80px)
                        const buffer = 100;

                        if (distance > buffer) {
                            // Attract towards buffer edge
                            const force = (maxDist - distance) / maxDist;
                            const attractionStrength = 0.03;
                            this.vx += (dx / distance) * force * attractionStrength;
                            this.vy += (dy / distance) * force * attractionStrength;
                        } else {
                            // Repel if too close (maintain buffer)
                            const repulsionStrength = 0.05;
                            this.vx -= (dx / distance) * repulsionStrength;
                            this.vy -= (dy / distance) * repulsionStrength;
                        }
                    }
                }

                // Drag
                this.vx *= 0.96;
                this.vy *= 0.96;

                // Move
                this.x += this.vx;
                this.y += this.vy;

                // Continuous organic movement (wave-like drift)
                this.x += Math.cos(this.angle) * 0.2;
                this.y += Math.sin(this.angle) * 0.2;

                // Screen Wrap
                if (this.x < 0) this.x = canvas.width;
                if (this.x > canvas.width) this.x = 0;
                if (this.y < 0) this.y = canvas.height;
                if (this.y > canvas.height) this.y = 0;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, Math.max(0, this.size), 0, Math.PI * 2);
                ctx.fillStyle = this.baseColor + this.alpha + ')';
                ctx.fill();
            }
        }

        // Increased particle count
        const particleCount = window.innerWidth < 768 ? 60 : 150;
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('touchmove', handleTouchMove);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: -1,
            }}
        />
    );
};

export default ParticleBackground;
