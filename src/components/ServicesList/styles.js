import styled from "styled-components";

import {
    Row,
    Form,
    Button,
    InputGroup,
} from "react-bootstrap";

import { Link } from "react-router-dom";



export const Title = styled.p`
  margin-top: 30px;
  font: normal normal bold 28px Acumin Pro;
  letter-spacing: 0px;
  color: #3c3c3c;
  opacity: 1;
`;


export const WellContainer = styled.div`
  background-color: #fff !important;
  border-radius: 0 !important;
  border: #d1d1d1 solid 1px;
  padding-top: 30px;
  margin-bottom: 30px;
`;

export const PasswordRecover = styled.div`
  min-height: 100vh;
`;

export const RowRecover = styled(Row)`
  background: #f4f4f4;
`;
