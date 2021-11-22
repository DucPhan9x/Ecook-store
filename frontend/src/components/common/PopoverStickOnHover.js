import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Overlay, Popover } from "react-bootstrap";

function PopoverStickOnHover({
  delay,
  onMouseEnter,
  children,
  component,
  placement,
  className = "",
}) {
  const [showPopover, setShowPopover] = useState(false);
  const childNode = useRef(null);
  let setTimeoutConst = null;

  useEffect(() => {
    return () => {
      if (setTimeoutConst) {
        clearTimeout(setTimeoutConst);
      }
    };
  });

  const handleMouseEnter = () => {
    setTimeoutConst = setTimeout(() => {
      setShowPopover(true);
      onMouseEnter();
    }, delay);
  };

  const handleMouseLeave = () => {
    clearTimeout(setTimeoutConst);
    setShowPopover(false);
  };

  const displayChild = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
      ref: (node) => {
        childNode.current = node;
        const { ref } = child;
        if (typeof ref === "function") {
          ref(node);
        }
      },
    })
  )[0];

  return (
    <>
      {displayChild}
      <Overlay
        show={showPopover}
        placement={placement}
        target={childNode}
        shouldUpdatePosition
      >
        <Popover
          onMouseEnter={() => {
            setShowPopover(true);
          }}
          onMouseLeave={handleMouseLeave}
          id="popover"
          className={className}
        >
          {component}
        </Popover>
      </Overlay>
    </>
  );
}

PopoverStickOnHover.propTypes = {
  children: PropTypes.element.isRequired,
  delay: PropTypes.number,
  onMouseEnter: PropTypes.func,
  component: PropTypes.node.isRequired,
  placement: PropTypes.string.isRequired,
};

PopoverStickOnHover.defaultProps = {
  delay: 0,
  onMouseEnter: () => {},
};

export default PopoverStickOnHover;
