import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useAuthentication, useTemporary } from '@internship/shared/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useHistory } from 'react-router-dom';

const StyledAnchorTag = styled.a`
  font-weight: 400;
  font-size: 16px;
`;
const StyledApp = styled.div`
  font-family: sans-serif;
  text-align: center;
`;

const StyledRow = styled(Row)`
  margin-bottom: 1rem;
`;

const H4 = styled.h4`
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
const Container = styled.div`
  display: inline-block;
  padding: 4.5rem;
`;

export const Login = () => {
  const { handleSubmit } = useForm();
  const { isSuccessRequired } = useTemporary();
  const { isAuthenticated } = useAuthentication();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch({ type: '@temp/SUCCESS_REQUIRED', payload: null });
  }, [isSuccessRequired]);

  useEffect(() => {
    dispatch({ type: '@temp/ERROR_REQUIRED', payload: null });
    if (isAuthenticated) {
      history.push('/');
    }
  }, [isAuthenticated]);

  return (
    <StyledApp>
      <form>
        <Container>
          <div className="mb-3 mt-3">
            <StyledAnchorTag
              className="btn btn-outline-dark alert-dismissible"
              href="http://localhost:8080/oauth2/authorize/google?redirect_uri=http://localhost:4200/auth"
            >
              <FontAwesomeIcon icon={faGoogle} style={{ marginRight: '10px' }} /> Log in with google
            </StyledAnchorTag>
          </div>
        </Container>
      </form>
    </StyledApp>
  );
};
