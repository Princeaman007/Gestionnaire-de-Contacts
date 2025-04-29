import React, { useState, useEffect } from 'react';
import { Alert as BootstrapAlert } from 'react-bootstrap';

const Alert = ({ variant = 'danger', message, timeout = 5000, onClose }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onClose) onClose();
    }, timeout);

    return () => clearTimeout(timer);
  }, [timeout, onClose]);

  if (!show || !message) return null;

  return (
    <BootstrapAlert variant={variant} onClose={() => setShow(false)} dismissible>
      {message}
    </BootstrapAlert>
  );
};

export default Alert;