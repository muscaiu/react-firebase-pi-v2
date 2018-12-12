import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  padding-top: 20px;
`;

const WeatherValue = styled.span`
  font-size: 13px;
  color: #BDBDBD;
`;

const Weather = ({ lastWeatherUpdate }) => {
  return (
    lastWeatherUpdate ?
      <Wrapper>
        <WeatherValue>
          {` ${lastWeatherUpdate.WeatherText} ${lastWeatherUpdate.Temperature.Metric.Value} °C`}
        </WeatherValue>
      </Wrapper> :
      <div>loading...</div>
  )
}

export default Weather;
