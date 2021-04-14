import React, {useEffect, useState} from 'react';
import { Container } from 'react-bootstrap';
import styled from 'styled-components';
import {api} from "@internship/shared/api";

const StyledContainer = styled(Container)`
  margin-top: 1.5rem;
`;
const StyledStrong = styled.strong`
  margin-right: 1rem;
`;

export const WhatIf = () => {
  const [countryName, setCountryName] = useState("south-africa");
  const [countryCode, setCountryCode] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    api.auth
      .dayone(countryName)
      .then((r) => setCountryCode(r.countryCode))
      .catch((e) => console.error(e));
  }, []);
  useEffect(() => {
    api.auth
      .countries()
      .then((r) => setName(r.country))
      .catch((e) => console.error(e));
  }, []);
  return <StyledContainer>
    <div>{countryCode}</div>
    <div>{name}</div>
  </StyledContainer>;
};
