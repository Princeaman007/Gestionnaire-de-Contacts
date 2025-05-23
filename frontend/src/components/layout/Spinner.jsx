import React from 'react';
import { Spinner as BootstrapSpinner } from 'react-bootstrap';

const Spinner = () => {
  return (
    <div className="d-flex justify-content-center my-5">
      <BootstrapSpinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">Chargement...</span>
      </BootstrapSpinner>
    </div>
  );
};

export default Spinner;