import { useEffect, useRef } from 'react';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  animationType?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'rotate';
  delay?: number;
}

export const ScrollAnimation: React.FC<ScrollAnimationProps> = ({ 
  children, 
  className = '', 
  animationType = 'fadeUp',
  delay = 0 
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target as HTMLElement;
          
          if (entry.isIntersecting) {
            // Element is entering viewport - animate in
            setTimeout(() => {
              target.classList.add('animate-in');
              target.classList.remove('animate-out');
            }, delay);
          } else {
            // Element is leaving viewport - animate out
            target.classList.add('animate-out');
            target.classList.remove('animate-in');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '-50px 0px -50px 0px'
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div 
      ref={elementRef}
      className={`scroll-animate ${animationType} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};