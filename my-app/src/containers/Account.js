import React, { useState} from "react";
import Popup from 'reactjs-popup';

const Account = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  return (
    <>
    <Popup trigger={<button className="button"> Open Modal </button>} modal>
      <span className="popup"> Modal content </span>
    </Popup>
    </>
  );
};

export default Account;

