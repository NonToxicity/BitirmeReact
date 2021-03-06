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
  const [showSecond, setShowSecond] = useState(false);
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
    setShowSecond(false);
    setDeathNumber(175);
    setRecoveryNumber(3273);
    setCaseNumber(48237);
  };
  const funcc = () => {
    setShowSecond(true);
    setDeathNumber(412);
    setRecoveryNumber(8450);
    setCaseNumber(9850);
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
                 <label>Se??ilen ??lke: {countryName}</label>
               </Col>
               <Col sm={8}>
                 <label>Vaka Say??s??: {caseNumber}</label>
               </Col>
             </Row>
              <Row>
                <Col sm={4}>
                  <label>Se??ilen ??ehir: {cityName}</label>
                </Col>
                <Col sm={8}>
                  <label>??yile??en Say??s??: {recoveryNumber}</label>
                </Col>
              </Row>
              <Row>
                <Col sm={4}>
                  <label>Se??ilen Tarih: {date.getDate()}.{date.getMonth() + 1}.{date.getFullYear()}</label>
                </Col>
                <Col sm={8}>
                  <label>??l??m Say??s??: {deathNumber}</label>
                </Col>
              </Row>
            </Col>
          ):null}
        </Row>
      <StyledRow>
        {show ? (
          <Button variant="outline-primary" type="submit" onClick={funcc}>
            Submit
          </Button>):
          (<Button variant="outline-primary" type="submit" onClick={func}>
          Submit
        </Button>)}

      </StyledRow>


    </>
  );
};
