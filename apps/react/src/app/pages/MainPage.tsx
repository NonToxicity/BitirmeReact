import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadMapApi } from '@internship/shared/utils';
import { MyMap } from '@internship/ui';
import Calendar from 'react-calendar';
import moment from 'moment'

const StyledDiv = styled.div`
  margin-bottom: 1rem;
`;
const StyledCalendar = styled(Calendar)`
  margin-top: 1rem;
  margin-left: 1rem;
  max-width: 250px;
`;
const StyledBottom = styled.div``;
export const MainPage = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [date, setDate] = useState(new Date());
  const [countryName, setCountryName] = useState('Türkiye');
  const [cityName, setCityName] = useState('Ankara');
  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, [countryName]);

  /*useEffect(() => {
    api.auth
      .dayone(countryName)
      .then((r) => setCountryCode(r.countryCode))
      .catch((e) => console.error(e));
  }, []);*/

  return (
    <>
      <StyledDiv>
        {scriptLoaded && (
          <MyMap mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} setCountryName={setCountryName} setCityName={setCityName} />
        )}
      </StyledDiv>
      <StyledBottom>
        <StyledCalendar onChange={setDate} value={date} />
        {cityName}
        <br />
        {countryName}
        <br />
      </StyledBottom>
    </>
  );
};
