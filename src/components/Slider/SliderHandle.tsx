import { MouseEventHandler, forwardRef } from 'react';

export interface SliderHandleProps {
  value: number;
  onDragStart: MouseEventHandler;
}

export const SliderHandle = forwardRef<SVGCircleElement, SliderHandleProps>(
  (props, ref) => {
    const { value, onDragStart } = props;

    return (
      <circle
        style={{
          fill: '#434549',
          stroke: '#000',
          strokeWidth: '.465',
          cursor: 'pointer',
        }}
        cx={value.toString()}
        cy="2.5"
        r="2"
        ref={ref}
        onMouseDown={onDragStart}
      />
    );
  }
);
