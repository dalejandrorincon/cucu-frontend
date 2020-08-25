import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { CounterButton } from "../components/CounterButton";
import { Wrapper } from "../components/Wrapper";
import { Title } from "../components/Title";

interface Props {
  counter: number;
  reduxIncreaseCounter: () => void;
  reduxDecreaseCounter: () => void;
}

function HomePage({
  reduxIncreaseCounter,
  reduxDecreaseCounter,
  counter,
}: Props) {
  return (
    <Wrapper>
      <Title>Hello CUCU!!!</Title>
      <CounterButton onClick={reduxDecreaseCounter}>-</CounterButton>
      <Title>{counter}</Title>
      <CounterButton onClick={reduxIncreaseCounter}>+</CounterButton>
    </Wrapper>
  );
}

const mapStateToProps = (state: any) => {
  return {
    counter: state.counter.counter,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    reduxIncreaseCounter: () =>
      dispatch({
        type: "INCREASE_COUNTER",
        value: 1,
      }),
    reduxDecreaseCounter: () =>
      dispatch({
        type: "DECREASE_COUNTER",
        value: 1,
      }),
  };
};

HomePage.propTypes = {
  counter: PropTypes.number.isRequired,
  reduxIncreaseCounter: PropTypes.func.isRequired,
  reduxDecreaseCounter: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
