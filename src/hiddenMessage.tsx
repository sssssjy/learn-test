import React, { useState } from "react";

function HiddenMessage(props: any) {
  const [show, setShow] = useState(false);
  const { children } = props;

  return (
    <div>
      <label htmlFor="toggle">显示</label>
      <input
        type="checkbox"
        name="toggle"
        id="toggle"
        checked={show}
        onChange={(e) => setShow(e.target.checked)}
      />
      {show ? children : null}
    </div>
  );
}

export default HiddenMessage;
