import React, { useEffect, useState } from 'react';
import { Button, Input, MyMap } from '@internship/ui';
import { loadMapApi } from '@internship/shared/utils';
import styled from 'styled-components';
import Calendar from 'react-calendar';
import { useForm } from 'react-hook-form';
import { Col, Row } from 'react-bootstrap';
import { api } from '@internship/shared/api';

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
const MarginRow = styled(Row)`
  margin-bottom: 1-rem;
`;

const StyledLabel = styled.label`
  margin-left: 2rem;
  margin-bottom: 1rem;
`;
interface City {
  center: google.maps.LatLngLiteral;
  population: number;
}

interface center {
  lat;
  lng;
  population;
  countryName;
}

export const WhatIf = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const { handleSubmit, register, errors } = useForm();
  const [firstDate, setFirstDate] = useState(new Date());
  const [secondDate, setSecondDate] = useState(new Date());
  const [countryName, setCountryName] = useState('Turkey');
  const [cityName, setCityName] = useState('Ankara');
  const [handwash, setHandwash] = useState('20');
  const [oldPeopleNumber, setOldPeopleNumber] = useState('20');
  const [restriction, setRestriction] = useState('20');
  const [smokerNumber, setSmokerNumber] = useState('20');
  const [mask, setMask] = useState('20');
  const [countries, setCountries] = useState<center | center[]>([]);
  const data = require('./data.json');
  const [addCircle, setAddCircle] = useState(false);

  const onSubmit = (values) => {
    values = { ...values, countryName, firstDate, secondDate };
    api.auth
      .whatIfGet(values)
      .then((r) => {
        {
          for (var i = 0; i < r.length; i++) {
            countries.push({ lat: r[i]?.lat, lng: r[i]?.lng, population: r[i]?.population, countryName: r[i]?.countryName });
          }
        }
      })
      .catch((e) => console.error(e));

  };

  useEffect(() => {
    const googleMapScript = loadMapApi();
    googleMapScript.addEventListener('load', function () {
      setScriptLoaded(true);
    });
  }, [countryName,addCircle]);

  const checkCircle = () => {
    setAddCircle(true);
    for(var i=0; i<data.length;i++){
      countries.push({ lat: Number(data[i]?.Lat), lng: Number(data[i]?.Lon), population: Number(data[i]?.Cases), countryName: data[i]?.Country });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledDiv>
          {scriptLoaded && (
            <MyMap
              mapType={google.maps.MapTypeId.ROADMAP}
              mapTypeControl={true}
              setCountryName={setCountryName}
              setCityName={setCityName}
              countries={countries}
              addCircle={addCircle}
            />
          )}
        </StyledDiv>
        <Row>
          <Col sm={3}>
            <StyledCalendar onChange={setFirstDate} value={firstDate} />
          </Col>
          <Col sm={6}>
            <Row>
              <Col sm={3}>
                <label>El Yikama Orani:</label>
              </Col>
              <Col sm={6}>
                <Input
                  type="range"
                  name="handwash"
                  min="0"
                  max="100"
                  defaultValue="20"
                  step="any"
                  onChange={(e) => setHandwash(e.target.value)}
                  ref={register({ required: true })}
                  errors={errors}
                />
              </Col>
              <Col sm={3}>
                <label>{handwash}</label>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <label>65+ Orani:</label>
              </Col>
              <Col sm={6}>
                <Input
                  type="range"
                  name="oldPeopleNumber"
                  min="0"
                  max="100"
                  defaultValue="20"
                  step="any"
                  onChange={(e) => setOldPeopleNumber(e.target.value)}
                  ref={register({ required: true })}
                  errors={errors}
                />
              </Col>
              <Col sm={3}>
                <label>{oldPeopleNumber}</label>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <label>Kisitlama Orani:</label>
              </Col>
              <Col sm={6}>
                <Input
                  type="range"
                  name="restriction"
                  min="0"
                  max="100"
                  defaultValue="20"
                  step="any"
                  onChange={(e) => setRestriction(e.target.value)}
                  ref={register({ required: true })}
                  errors={errors}
                />
              </Col>
              <Col sm={3}>
                <label>{restriction}</label>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <label>Sigara içen Orani:</label>
              </Col>
              <Col sm={6}>
                <Input
                  type="range"
                  name="smokerNumber"
                  min="0"
                  max="100"
                  defaultValue="20"
                  step="any"
                  onChange={(e) => setSmokerNumber(e.target.value)}
                  ref={register({ required: true })}
                  errors={errors}
                />
              </Col>
              <Col sm={3}>
                <label>{smokerNumber}</label>
              </Col>
            </Row>
            <Row>
              <Col sm={3}>
                <label>Maske Takma Orani:</label>
              </Col>
              <Col sm={6}>
                <Input
                  type="range"
                  name="mask"
                  min="0"
                  max="100"
                  defaultValue="20"
                  step="any"
                  onChange={(e) => setMask(e.target.value)}
                  ref={register({ required: true })}
                  errors={errors}
                />
              </Col>
              <Col sm={3}>
                <label>{mask}</label>
              </Col>
            </Row>
          </Col>
          <Col sm={3}>
            <StyledCalendar onChange={setSecondDate} value={secondDate} />
          </Col>
        </Row>
        <MarginRow>
          <Col sm={3}>Salgının Başlayacağı Tarih:</Col>
          <Col sm={6}>
            <Row>
              <Col sm={3}>Seçilen Ülke İsmi:</Col>
              <Col sm={3}>{countryName}</Col>
            </Row>
          </Col>
          <Col sm={3}>Bakılması İstenen Tarih:</Col>
        </MarginRow>
        <MarginRow>
          <Col sm={3}>
            {firstDate.getDate()}.{firstDate.getMonth() + 1}.{firstDate.getFullYear()}
          </Col>
          <Col sm={6}>
            <Row>
              <Col sm={3}>Seçilen Şehir İsmi:</Col>
              <Col sm={3}>{cityName}</Col>
            </Row>
          </Col>
          <Col sm={3}>
            {secondDate.getDate()}.{secondDate.getMonth() + 1}.{secondDate.getFullYear()}
          </Col>
        </MarginRow>
        <StyledRow>
          <Button variant="outline-primary" type="submit" onClick={checkCircle}>
            Submit
          </Button>
        </StyledRow>
      </form>
    </>
  );
};
