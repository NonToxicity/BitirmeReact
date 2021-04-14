import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadMapApi } from '@internship/shared/utils';
import { MyMap } from '@internship/ui';
import Calendar from 'react-calendar';

const StyledDiv = styled.div`
  margin-bottom: 1rem;
`;
const StyledCalendar= styled(Calendar)`
  margin-top:1rem;
  margin-left:1rem;
  max-width: 250px;
`;
const StyledBottom = styled.div`

`;
export const MainPage = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, []);

  return (
    <>
      <StyledDiv>{scriptLoaded && <MyMap mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} />}</StyledDiv>
      <StyledBottom>
      <StyledCalendar
        onChange={setStartDate}
        value={startDate}
      />
        {startDate.getDate()}
      </StyledBottom>
    </>
  );
};
