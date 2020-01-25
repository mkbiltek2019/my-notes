import React, { useState } from "react";
import PropTypes from "prop-types";

const Menu = (props) => {
  const [open, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!open);
    props.open(!open);
  };

  return (
    <div id="menu" className="tab action">
      <img
        id="gear"
        src="gear.svg"
        alt="Gear"
        onClick={onClick} />
    </div>
  );
};

Menu.propTypes = {
  open: PropTypes.func,
};

export default Menu;
