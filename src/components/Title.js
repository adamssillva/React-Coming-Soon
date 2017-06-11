import React, { Component } from 'react';
import {render} from 'react-dom';
import styled, { keyframes } from 'styled-components';
import { compose, lifecycle, branch, renderComponent } from 'recompose';
import icon from '../css/icon.css';
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const Wrapper = styled.div`
  position: absolute;
  top: 15%;
  left: 6%;
  max-width: 600px;
  zIndex: 999;
`
const IconInLeft = styled.a`
  animation-name: ${props => props.name};
  animation-delay: ${props => props.delay};
  animation-duration: ${props => props.duration};
  animation-timing-function: ${props => props.timingFunction};
  animation-iteration-count: ${props => props.iterationCount};
  animation-direction: ${props => props.direction};
  animation-fill-mode: ${props => props.fillMode};
  animation-play-state:  ${props => props.playState};
  display: ${props => props.display};
  text-decoration: ${props => props.textDecoration};
  font-size: ${props => props.fontSize};
  color: ${props => props.color};
  margin-top: ${props => props.marginTop};
  font-family: 'Cabin', sans-serif;
`
const MainTitle = styled.div`
  animation-duration: ${props => props.duration};
  animation-timing-function: ${props => props.timingFunction};
  animation-delay: ${props => props.delay};
  animation-iteration-count: ${props => props.iterationCount};
  animation-direction: ${props => props.direction};
  animation-fill-mode: ${props => props.fillMode};
  animation-play-state:  ${props => props.playState};
  display: ${props => props.display};
  font-family: 'Cabin', sans-serif;
  font-size: 32px;
  color: white;
`;

IconInLeft.defaultProps = {
  delay: '3s',
  duration: '1s',
  timingFunction: 'ease',
  iterationCount: '1',
  direction: 'normal',
  fillMode: 'both',
  playState: 'running',
  display: 'inline-block',
  target: '_blank',
  cursor: 'pointer',
  fontSize: '32px',
  color: 'white',
  marginTop: '20px',
  textDecoration: 'none',
}

MainTitle.defaultProps = {
  duration: '1s',
  timingFunction: 'ease',
  delay: '0.5s',
  iterationCount: '1',
  direction: 'normal',
  fillMode: 'both',
  playState: 'running',
  display: 'block'
}

const bounceInDownAnimation = keyframes`
  from, 60%, 75%, 90%, to {
     animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
   }
   0% {
     opacity: 0;
     transform: translate3d(0, -3000px, 0);
   }
   60% {
     opacity: 1;
     transform: translate3d(0, 25px, 0);
   }
   75% {
     transform: translate3d(0, -10px, 0);
   }
   90% {
     transform: translate3d(0, 5px, 0);
   }
   to {
     transform: none;
   }
  `;

const bounceInUpAnimation = keyframes`
  from, 60%, 75%, 90%, to {
    animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  from {
    opacity: 0;
    transform: translate3d(0, 3000px, 0);
  }
  60% {
    opacity: 1;
    transform: translate3d(0, -20px, 0);
  }
  75% {
    transform: translate3d(0, 10px, 0);
  }
  90% {
    transform: translate3d(0, -5px, 0);
  }
  to {
    transform: translate3d(0, 0, 0);
  }
`;

const bounceInLeftAnimation = keyframes`
  from, 60%, 75%, 90%, to {
   animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);
  }
  0% {
   opacity: 0;
   transform: translate3d(-3000px, 0, 0);
  }
  60% {
   opacity: 1;
   transform: translate3d(25px, 0, 0);
  }
  75% {
   transform: translate3d(-10px, 0, 0);
  }
  90% {
   transform: translate3d(5px, 0, 0);
  }
  to {
   transform: none;
  }
`;

const MainTitleBounceIn = styled(MainTitle)`
  animation-name: ${bounceInDownAnimation};
`;

const SubTitleBounceIn = styled(MainTitle)`
  animation-name: ${bounceInDownAnimation};
  animation-delay: 1.5s;
  font-size: 64px;
`
const ContentBounceIn = styled(MainTitle)`
  animation-name: ${bounceInUpAnimation};
  animation-delay: 2.5s;
  font-size: 16px;
  margin-top: 30px;
`
const InstagramInLeft = styled(IconInLeft)`
  animation-name: ${bounceInLeftAnimation};
`
const EmailInLeftEmail = styled(IconInLeft)`
  animation-name: ${bounceInUpAnimation};
  margin-left: 10px;
`
const withUserData = lifecycle({
  getInitialState() {
    return { loading: true };
  },
  componentDidMount() {
    fetchData().then((data) =>
      this.setState({ loading: false, ...data }));
  }
});

const Spinner = () =>
  <div className="Spinner">
    <div className="loader">Loading...</div>
  </div>;

const isLoading = ({ loading }) => loading;

const withSpinnerWhileLoading = branch(
  isLoading,
  renderComponent(Spinner)
);

const enhance = compose(
  withUserData,
  withSpinnerWhileLoading
);

const Heading = enhance(({ heading, subheading, content }) =>
  <div>
    <MainTitleBounceIn>{ heading }</MainTitleBounceIn>
    <SubTitleBounceIn>{ subheading }</SubTitleBounceIn>
    <ContentBounceIn>{ content }</ContentBounceIn>
  </div>
);

const Instagram = ({ text, className, href }) =>
  <InstagramInLeft href= { href } className={ className }>{ text }</InstagramInLeft>
;

const Email = ({ text, className, href }) =>
  <EmailInLeftEmail href= { href } className={ className }>{ text }</EmailInLeftEmail>
;

function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ heading: "Welcome to the new", subheading: "Paula Novotna Website", content: "Works in progress for Paula Novotná, the best kitesurfers in the Czech Republic and the current number two of the 2016 Clean Ocean Project Championship Tour"   }), 1500);
  });
}

const Title = () => (
  <Wrapper>
    <Heading />
    <Instagram href="https://www.instagram.com/paulanovotna/" className="icon-instagram" />
    <Email href="mailto:paula.novotna@gmail.com?Subject=Hello%20again" className="icon-mail2" />
  </Wrapper>
);

export default Title;
