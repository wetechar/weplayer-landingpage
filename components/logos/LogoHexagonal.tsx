import React from 'react';

interface LogoHexagonalProps {
  /** Tamaño del contenedor (clases de Tailwind) */
  size?: string;
  /** Color del trazo (usa currentColor por defecto) */
  color?: string;
  /** ViewBox personalizado para ajustar el zoom/recorte */
  viewBox?: string;
  /** Clases adicionales para el contenedor */
  className?: string;
  /** Mostrar borde para debug (por defecto false) */
  showBorder?: boolean;
}

const LogoHexagonal: React.FC<LogoHexagonalProps> = ({
  size = 'w-48 h-48 md:w-60 md:h-60 lg:w-60 lg:h-60 xl:w-70 xl:h-70',
  color = 'currentColor',
  viewBox = '400 300 600 700',
  className = '',
  showBorder = false,
}) => {
  return (
    <div className={`relative ${size} ${className} ${showBorder ? 'border' : ''}`}>
      <svg 
        id="Capa_1" 
        xmlns="http://www.w3.org/2000/svg" 
        version="1.1" 
        viewBox={viewBox}
        className="w-full h-full"
        style={{ color }}
      >
        <defs>
          <style>
            {`.st0 {
              fill: none;
              fill-rule: evenodd;
              stroke: currentColor;
              stroke-miterlimit: 10;
              stroke-width: 8.5px;
            }`}
          </style>
        </defs>
        <polygon className="st0" points="877.72 561.88 797.19 811.35 512.13 658.17 694.91 363.86 705.72 348.43 877.72 561.88"/>
        <g>
          <polygon className="st0" points="705.67 344.39 448.76 491.39 448.76 790.75 706.66 938.68 962.58 790.75 962.58 491.39 705.67 344.39"/>
          <polyline className="st0" points="448.76 790.75 508.15 657.7 448.76 491.39"/>
          <polyline className="st0" points="877.67 561.42 512.08 657.7 706.66 932.77 797.14 810.89 958.66 789.37 877.67 561.42 962.58 491.39"/>
        </g>
      </svg>
    </div>
  );
};

export default LogoHexagonal;
