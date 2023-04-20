import { ComponentPropsWithRef, forwardRef } from 'react';

export interface SliderLineProps extends ComponentPropsWithRef<'path'> {
  start?: number;
  end?: number;
  color?: string;
}

export const SliderLine = forwardRef<SVGPathElement, SliderLineProps>(
  (props, ref) => {
    const { start = 0.5, end = 99, color = '#434543', ...pathProps } = props;

    const width = end - start;

    return (
      <path
        style={{
          fill: color,
        }}
        d={`M${start} 1.775h${width}v1.449H${start}z`}
        cx={start}
        {...pathProps}
        ref={ref}
      />
    );
  }
);
