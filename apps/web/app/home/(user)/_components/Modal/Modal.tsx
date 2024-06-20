import React from 'react';

function Modal(props: any) {
  const { active, setActive, children } = props;
  return (
    <>
      {active && (
        <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000083] z-30 flex items-center justify-center">
          <button
            type="button"
            className="fixed h-screen w-screen z-40 bg-transparent cursor-default"
            onClick={() => {
              setActive(false);
            }}
          />
          {children}
        </div>
      )}
    </>
  );
}

export default Modal;
