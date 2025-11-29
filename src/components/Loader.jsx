import React from 'react';
import styled from 'styled-components';

const Loader = () => {
  return (
    <StyledWrapper>
      <div className="loader" />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .loader {
   width: 70px;
   height: 70px;
  }

  .loader::before {
   content: "";
   box-sizing: border-box;
   position: absolute;
   width: 70px;
   height: 70px;
   border-radius: 50%;
   border-top: 5px solid #106f19ff;
   border-right: 5px solid transparent;
   animation: spinner8217 0.8s linear infinite;
  }

  @keyframes spinner8217 {
   to {
    transform: rotate(360deg);
   }
  }`;

export default Loader;
