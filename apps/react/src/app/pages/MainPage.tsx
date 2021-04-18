import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { loadMapApi } from '@internship/shared/utils';
import {Button, MyMap} from '@internship/ui';
import Calendar from 'react-calendar';
import {Col, Row} from "react-bootstrap";

const StyledDiv = styled.div`
  margin-bottom: 1rem;
`;
const StyledCalendar = styled(Calendar)`
  margin-top: 1rem;
  margin-left: 1rem;
  max-width: 250px;
`;
const StyledRow = styled(Row)`
  place-content: center;
`;
export const MainPage = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [date, setDate] = useState(new Date());
  const [countryName, setCountryName] = useState('Turkey');
  const [cityName, setCityName] = useState('Ankara');
  const [show, setShow] = useState(false);
  const [deathNumber, setDeathNumber] = useState(0);
  const [recoveryNumber, setRecoveryNumber] = useState(0);
  const [caseNumber, setCaseNumber] = useState(0);

  useEffect(() => {
  }, []);
  useEffect(() => {
    console.log(scriptLoaded);
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, []);

  /*useEffect(() => {
    api.auth
      .dayone(countryName)
      .then((r) => setCountryCode(r.countryCode))
      .catch((e) => console.error(e));
  }, []);*/

  const func = () => {
    setShow(true);
    setDeathNumber(175);
    setRecoveryNumber(3273);
    setCaseNumber(48237);
  };

  return (
    <>
      <StyledDiv>
        {scriptLoaded && (
          <MyMap mapType={google.maps.MapTypeId.ROADMAP} mapTypeControl={true} setCountryName={setCountryName} setCityName={setCityName} />
        )}
      </StyledDiv>
        <Row>
          <Col sm={3}>
          <StyledCalendar onChange={setDate} value={date} />
          </Col>
          {show ? (
            <Col sm={9}>
             <Row>
               <Col sm={4}>
                 <label>Seçilen Ülke: {countryName}</label>
               </Col>
               <Col sm={8}>
                 <label>Vaka Sayısı: {caseNumber}</label>
               </Col>
             </Row>
              <Row>
                <Col sm={4}>
                  <label>Seçilen Şehir: {cityName}</label>
                </Col>
                <Col sm={8}>
                  <label>İyileşen Sayısı: {recoveryNumber}</label>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <label>Seçilen Tarih: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</label>
                </Col>
                <Col sm={8}>
                  <label>Ölüm Sayısı: {deathNumber}</label>
                </Col>
              </Row>
            </Col>
          ):null}
        </Row>
      <StyledRow>
        <Button variant="outline-primary" type="submit" onClick={func}>
          Submit
        </Button>
      </StyledRow>


    </>
  );
};
