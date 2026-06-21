import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export default function DnaHelixAnimation() {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    // Clear any existing children to prevent double-initialization
    svg.selectAll("*").remove();

    // Wider and taller vertical dimensions
    const width = 480;
    const height = 540;
    const centerX = width / 2;
    const N = 20; // Increased base pairs for a taller vertical stretch

    // Nucleotide configurations
    const nucleotides = ['A', 'T', 'C', 'G'];
    const pairMap = { A: 'T', T: 'A', C: 'G', G: 'C' };
    const nucleotideColors = {
      A: '#2563eb', // Royal Blue
      T: '#dc2626', // Crimson Red
      C: '#16a34a', // Forest Green
      G: '#ea580c', // Orange/Amber
    };

    // Calculate spacing along the y-axis
    const paddingY = 45;
    const spacing = (height - paddingY * 2) / (N - 1);

    // Generate base pair data
    const dnaData = Array.from({ length: N }, (_, i) => {
      const base1 = nucleotides[Math.floor(Math.random() * nucleotides.length)];
      const base2 = pairMap[base1];
      return {
        id: i,
        y: paddingY + i * spacing, // y coordinate is fixed
        base1,
        base2,
        color1: nucleotideColors[base1],
        color2: nucleotideColors[base2],
        localTime: 0,
        e: 0, // current expansion factor
        x1: centerX,
        x2: centerX,
        angle: 0,
      };
    });

    // 1. Append Gradients and Definitions
    const defs = svg.append('defs');

    // Gradient for Strand 1 (Vertical)
    const grad1 = defs
      .append('linearGradient')
      .attr('id', 'vector-blue')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    grad1.append('stop').attr('offset', '0%').attr('stop-color', '#1e3a8a');
    grad1.append('stop').attr('offset', '100%').attr('stop-color', '#3b82f6');

    // Gradient for Strand 2 (Vertical)
    const grad2 = defs
      .append('linearGradient')
      .attr('id', 'vector-grey')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');
    grad2.append('stop').attr('offset', '0%').attr('stop-color', '#475569');
    grad2.append('stop').attr('offset', '100%').attr('stop-color', '#94a3b8');

    // Glow filter for interactive nucleotides
    const filter = defs.append('filter').attr('id', 'glow').attr('x', '-20%').attr('y', '-20%').attr('width', '140%').attr('height', '140%');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'blur');
    const feMerge = filter.append('feMerge');
    feMerge.append('feMergeNode').attr('in', 'blur');
    feMerge.append('feMergeNode').attr('in', 'SourceGraphic');

    // 2. Append SVG Layers (maintaining correct draw order)
    
    // Group for rungs (connecting lines)
    const rungsGroup = svg.append('g').attr('class', 'rungs');
    
    // Paths for outer backbones (filaments)
    const strand1Path = svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'url(#vector-blue)')
      .attr('stroke-width', 6)
      .attr('stroke-linecap', 'round');

    const strand2Path = svg
      .append('path')
      .attr('fill', 'none')
      .attr('stroke', 'url(#vector-grey)')
      .attr('stroke-width', 4.5)
      .attr('stroke-linecap', 'round');

    // Group for nucleotides (nodes) and letters
    const nodesGroup = svg.append('g').attr('class', 'nodes');

    // 3. Bind Data to Elements
    const rungElements = rungsGroup
      .selectAll('g.rung-pair')
      .data(dnaData)
      .enter()
      .append('g')
      .attr('class', 'rung-pair');

    const rungLine1 = rungElements.append('line').attr('stroke-linecap', 'round');
    const rungLine2 = rungElements.append('line').attr('stroke-linecap', 'round');

    const centerDot = rungElements
      .append('circle')
      .attr('fill', '#ffffff')
      .attr('stroke', '#cbd5e1')
      .attr('stroke-width', 1.5)
      .attr('r', 2.5)
      .attr('opacity', 0);

    const nodePairs = nodesGroup
      .selectAll('g.node-pair')
      .data(dnaData)
      .enter()
      .append('g')
      .attr('class', 'node-pair');

    const node1 = nodePairs.append('circle').attr('class', 'node-1');
    const node2 = nodePairs.append('circle').attr('class', 'node-2');

    const text1 = nodePairs
      .append('text')
      .attr('class', 'text-1')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', '#ffffff')
      .style('font-family', 'var(--font-main), sans-serif')
      .style('font-weight', '800')
      .style('pointer-events', 'none')
      .text((d) => d.base1);

    const text2 = nodePairs
      .append('text')
      .attr('class', 'text-2')
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'central')
      .attr('fill', '#ffffff')
      .style('font-family', 'var(--font-main), sans-serif')
      .style('font-weight', '800')
      .style('pointer-events', 'none')
      .text((d) => d.base2);

    // 4. Interaction Area (Invisible layer to capture all mouse/touch coordinates)
    const interactionRect = svg
      .append('rect')
      .attr('width', width)
      .attr('height', height)
      .attr('fill', 'transparent')
      .style('pointer-events', 'all');

    const mouse = { x: null, y: null };

    const handleMouseMove = (event) => {
      const [mx, my] = d3.pointer(event);
      mouse.x = mx;
      mouse.y = my;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    interactionRect
      .on('mousemove', handleMouseMove)
      .on('mouseleave', handleMouseLeave)
      .on('touchmove', (event) => {
        if (event.touches && event.touches.length > 0) {
          const [mx, my] = d3.pointer(event.touches[0], interactionRect.node());
          mouse.x = mx;
          mouse.y = my;
        }
      })
      .on('touchend', handleMouseLeave);

    // Line generator for backbones (curved vertically)
    const lineGenerator = d3
      .line()
      .x((d) => d.x)
      .y((d) => d.y)
      .curve(d3.curveCatmullRom);

    let lastElapsed = 0;

    // 5. Animation Timer (runs at 60 FPS)
    const timer = d3.timer((elapsed) => {
      const dt = (elapsed - lastElapsed) * 0.001; // delta time in seconds
      lastElapsed = elapsed;

      const R_influence = 140; // Wider mouse interaction radius for larger canvas

      // Update positions and calculations for each base pair
      dnaData.forEach((d, i) => {
        // Calculate proximity target expansion
        let targetE = 0;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - centerX;
          const dy = mouse.y - d.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < R_influence) {
            // Gaussian-like dropoff for smooth bubble transition
            targetE = Math.pow(1 - dist / R_influence, 1.8);
          }
        }

        // Interpolate (lerp) expansion factor for organic transition speed
        d.e += (targetE - d.e) * 0.12;

        // Modulate local rotation speed: slows down by up to 85% when hovered (d.e = 1)
        const baseSpeed = 1.6;
        const currentSpeed = baseSpeed * (1.0 - d.e * 0.85);
        d.localTime += dt * currentSpeed;

        // Calculate phase angle with vertical waves index offset
        d.angle = d.localTime + i * 0.42;

        // Helix radius expands from 40px (collapsed) to 110px (expanded)
        const R = 40 + d.e * 70;

        // Compute 3D X coordinates (DNA is vertical, so it twists left and right)
        d.x1 = centerX + R * Math.sin(d.angle);
        d.x2 = centerX - R * Math.sin(d.angle);
      });

      // Update Backbone paths (x changes dynamically, y is static for each node)
      strand1Path.attr('d', lineGenerator(dnaData.map((d) => ({ x: d.x1, y: d.y }))));
      strand2Path.attr('d', lineGenerator(dnaData.map((d) => ({ x: d.x2, y: d.y }))));

      // Update Rungs (horizontal lines running from outer strands to center axis)
      rungLine1
        .attr('x1', (d) => d.x1)
        .attr('y1', (d) => d.y)
        .attr('x2', centerX)
        .attr('y2', (d) => d.y)
        .attr('stroke', (d) => (d.e > 0.05 ? d.color1 : '#cbd5e1'))
        .attr('stroke-width', (d) => 2.5 + d.e * 2.5)
        .attr('opacity', (d) => 0.2 + d.e * 0.75);

      rungLine2
        .attr('x1', (d) => d.x2)
        .attr('y1', (d) => d.y)
        .attr('x2', centerX)
        .attr('y2', (d) => d.y)
        .attr('stroke', (d) => (d.e > 0.05 ? d.color2 : '#cbd5e1'))
        .attr('stroke-width', (d) => 2.5 + d.e * 2.5)
        .attr('opacity', (d) => 0.2 + d.e * 0.75);

      centerDot
        .attr('cx', centerX)
        .attr('cy', (d) => d.y)
        .attr('opacity', (d) => d.e)
        .attr('r', (d) => 2.5 + d.e * 2.5);

      // Update Node Circles (Enlarged and dynamic: grows to max 15px)
      node1
        .attr('cx', (d) => d.x1)
        .attr('cy', (d) => d.y)
        // Size modulated by depth (cos(angle)) and expansion factor
        .attr('r', (d) => (5.0 + d.e * 10.0) * (1.0 + 0.22 * Math.cos(d.angle)))
        .attr('fill', (d) => (d.e > 0.08 ? d.color1 : '#64748b'))
        .attr('opacity', (d) => 0.35 + d.e * 0.65 * (Math.cos(d.angle) + 1.2) / 2.2)
        .attr('filter', (d) => (d.e > 0.3 ? 'url(#glow)' : null));

      node2
        .attr('cx', (d) => d.x2)
        .attr('cy', (d) => d.y)
        .attr('r', (d) => (5.0 + d.e * 10.0) * (1.0 - 0.22 * Math.cos(d.angle)))
        .attr('fill', (d) => (d.e > 0.08 ? d.color2 : '#64748b'))
        .attr('opacity', (d) => 0.35 + d.e * 0.65 * (1.2 - Math.cos(d.angle)) / 2.2)
        .attr('filter', (d) => (d.e > 0.3 ? 'url(#glow)' : null));

      // Update Nucleotide Letter Texts (Enlarged)
      text1
        .attr('x', (d) => d.x1)
        .attr('y', (d) => d.y)
        .attr('opacity', (d) => d.e)
        .style('font-size', (d) => `${(6.5 + d.e * 8.5) * (1.0 + 0.22 * Math.cos(d.angle))}px`);

      text2
        .attr('x', (d) => d.x2)
        .attr('y', (d) => d.y)
        .attr('opacity', (d) => d.e)
        .style('font-size', (d) => `${(6.5 + d.e * 8.5) * (1.0 - 0.22 * Math.cos(d.angle))}px`);
    });

    return () => {
      timer.stop();
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="540"
      viewBox="0 0 480 540"
      style={{ maxWidth: '480px', height: 'auto' }}
      className="hero-vector-svg"
    />
  );
}
