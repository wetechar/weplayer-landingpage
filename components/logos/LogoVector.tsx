import React from 'react';
import Image from 'next/image';

interface LogoVectorProps {
  /** Tamaño del contenedor (clases de Tailwind) */
  size?: string;
  /** Clases adicionales para el contenedor */
  className?: string;
  /** Mostrar borde para debug (por defecto false) */
  showBorder?: boolean;
  /** Prioridad de carga (por defecto false) */
  priority?: boolean;
}

const LogoVector: React.FC<LogoVectorProps> = ({
  size = 'w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80',
  className = '',
  showBorder = false,
  priority = false,
}) => {
  return (
    <div className={`relative ${size} ${className} ${showBorder ? 'border' : ''}`}>
      <Image
        src="/images/Vector-Wetechar.svg"
        alt="We Tech Vector Logo"
        fill
        className="object-contain"
        priority={priority}
        quality={95}
        sizes="(max-width: 768px) 192px, (max-width: 1024px) 224px, 320px"
      />
    </div>
  );
};

export default LogoVector;
