import React, { Fragment } from 'react';
import Navbar from '../common/_navbar';
import WavesWrapper from '../../ui_elements/waves';
import Content from './_content';

export default () => {
  return (
    <Fragment>
      <Navbar />
      <WavesWrapper>
        <Content />
      </WavesWrapper>
    </Fragment>
  );
};
