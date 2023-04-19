import { forwardRef } from 'react';

export const SliderLine = forwardRef<SVGPathElement>((_, ref) => {
  return (
    <path
      style={{
        fill: '#434543',
        fillOpacity: '.228522',
      }}
      d="M.5 1.775h99v1.449H.5z"
      ref={ref}
    />
  );
});
