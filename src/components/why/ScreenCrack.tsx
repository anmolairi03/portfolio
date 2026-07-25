import React from 'react';

interface ScreenCrackProps {
  visible: boolean;
  blackout: boolean;
}

/** Instant blackout when smashed. No star graphic. */
const ScreenCrack: React.FC<ScreenCrackProps> = ({ visible, blackout }) => {
  return (
    <div
      className={`crt-crack ${visible ? 'is-visible' : ''} ${blackout ? 'is-black' : ''}`}
      aria-hidden="true"
    >
      <div className="crt-crack__flash" />
      <div className="crt-crack__black" />
    </div>
  );
};

export default ScreenCrack;