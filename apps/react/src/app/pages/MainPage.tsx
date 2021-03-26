import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import { loadMapApi } from '@internship/shared/utils';
import {MyMap} from "@internship/ui";


const StyledContainer = styled(Container)`
  margin-top: 1.5rem;
`;
const StyledStrong = styled.strong`
  margin-right: 1rem;
`;

export const MainPage = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, []);

  return <StyledContainer>{scriptLoaded && <MyMap mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />}</StyledContainer>;
};
