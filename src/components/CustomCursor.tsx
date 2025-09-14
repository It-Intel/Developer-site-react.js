import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    const updateCursor = () => {
      cursorX += (mouseX - cursorX) * 0.1;
      cursorY += (mouseY - cursorY) * 0.1;
      
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      trailRefs.current.forEach((trail, index) => {
        if (trail) {
          const delay = (index + 1) * 0.05;
          const trailX = mouseX - (mouseX - cursorX) * delay;
          const trailY = mouseY - (mouseY - cursorY) * delay;
          
          trail.style.left = trailX + 'px';
          trail.style.top = trailY + 'px';
          trail.style.opacity = (1 - delay).toString();
        }
      });

      requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseEnter = () => {
      if (cursor) cursor.style.opacity = '1';
    };

    const handleMouseLeave = () => {
      if (cursor) cursor.style.opacity = '0';
    };

    const handleMouseDown = () => {
      if (cursor) {
        cursor.style.transform = 'scale(0.8)';
        cursor.style.background = 'radial-gradient(circle, #ff0088, transparent)';
      }
    };

    const handleMouseUp = () => {
      if (cursor) {
        cursor.style.transform = 'scale(1)';
        cursor.style.background = 'radial-gradient(circle, #00ff88, transparent)';
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    updateCursor();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="custom-cursor"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      {[...Array(5)].map((_, index) => (
        <motion.div
          key={index}
          ref={el => trailRefs.current[index] = el}
          className="cursor-trail"
          style={{
            width: `${20 - index * 3}px`,
            height: `${20 - index * 3}px`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.7 - index * 0.1 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
        />
      ))}
    </>
  );
};

export default CustomCursor;

