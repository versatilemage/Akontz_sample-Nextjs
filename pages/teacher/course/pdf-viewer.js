import React from 'react';
import Viewer from './viewpdf';

function Viewers() {
  return (
    <div>
      <Viewer fileUrl={`https://www.africau.edu/images/default/sample.pdf`}/>
    </div>
  );
}

export default Viewers;
