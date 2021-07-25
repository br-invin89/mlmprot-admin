/* eslint-disable prefer-destructuring */
/* eslint-disable react/no-unknown-property */
import React from 'react';
import styles from './CircularProgressBar.less';

export default (props) => {
  const sqSize = props.sqSize;
  const radius = (props.sqSize - props.strokeWidth) / 2;
  const viewBox = `0 0 ${sqSize} ${sqSize}`;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * props.percentage) / 100;
  return (
    <div className={`${styles.circleContainer}`}>
      <svg width={props.sqSize} height={props.sqSize} viewBox={viewBox}>
        <circle
          className={`${styles.circleBackground}`}
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
        />
        <circle
          className={`${styles.circleProgress} ${styles[props.status]}`}
          cx={props.sqSize / 2}
          cy={props.sqSize / 2}
          r={radius}
          strokeWidth={`${props.strokeWidth}px`}
          transform={`rotate(-90 ${props.sqSize / 2} ${props.sqSize / 2})`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
        />
        {props.render === 'image' ? (
          <defs>
            <pattern id="image" x="0%" y="0%" height="100%" width="100%" viewBox="0 0 512 512">
              <image x="0%" y="0%" width="512" xlinkHref={props.image}></image>
            </pattern>
          </defs>
        ) : (
          <text className={`${styles.circleText}`} x="50%" y="45%" dy=".3em" textAnchor="middle">
            {`${props.percentage}`}
          </text>
        )}
        {props.render === 'image' ? (
          <circle
            id="sd"
            class="medium"
            cx="50%"
            cy="50%"
            r="45%"
            fill="url(#image)"
            stroke="none"
            stroke-width="1%"
          />
        ) : (
          <text
            className={`${styles.circleTextTitle}`}
            x="50%"
            y="58%"
            dy=".3em"
            textAnchor="middle"
          >
            {`${props.title}`}
          </text>
        )}
      </svg>
    </div>
  );
};
