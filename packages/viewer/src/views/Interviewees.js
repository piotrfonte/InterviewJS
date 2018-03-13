/* eslint react/forbid-prop-types: 0 */
import css from "styled-components";
import React, { Component } from "react";
import { object, shape, string } from "prop-types";

import {
  Action,
  Actionbar,
  Avatar,
  Container,
  Icon,
  Separator,
  Text,
  Tip,
  color,
  setSpace
} from "interviewjs-styleguide";

import { Cover, Topbar, IntervieweeModal } from "../partials";

const Page = css.div`
  background: ${color.black};
  color: ${color.white};
  min-height: 100vh;
  min-width: 100vw;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const PageHead = css(Container)`
  ${setSpace("pbl")};
  width: 100%;
`;

const PageBody = css(Container)`
  ${setSpace("phl")};
  ${setSpace("pbl")};
  width: 100%;
`;

const PageFoot = css(Container)`
  ${setSpace("phl")};
  ${setSpace("pbl")};
`;

const Interviewees = css.ul`
  display: block;
  width: 100%;
`;

const Interviewee = css.li`
  ${setSpace("pvm")};
  border-bottom: 1px solid ${color.flareHL};
  cursor: pointer;
  display: block;
  & button {
    ${setSpace("mls")};
  }
  ${Avatar} {
    ${setSpace("mrm")};
  }
`;

const IntervieweeTitle = css(Text)`
  color: ${color.flareD};
`;

export default class ContextView extends Component {
  constructor(props) {
    super(props);
    this.state = { intervieweeModal: null };
    this.toggleIntervieweeModal = this.toggleIntervieweeModal.bind(this);
    this.startChat = this.startChat.bind(this);
  }
  toggleIntervieweeModal(e, target) {
    e.stopPropagation();
    if (target !== null) {
      this.setState({ intervieweeModal: target });
    } else {
      this.setState({ intervieweeModal: null });
    }
  }
  startChat(e, target) {
    e.stopPropagation();
    this.props.router.push(`/chat/${target}`);
  }
  render() {
    const { story } = this.props;
    return [
      <Topbar
        handleDetails={() => this.props.router.push(`/details`)}
        handleBack={() => this.props.router.push(`/context`)}
        key="topbar"
      />,
      <Page key="page">
        <PageHead flex={[0, 1, `${100 / 3}%`]}>
          <Cover image={story.cover} />
        </PageHead>
        <PageBody limit="m" flex={[1, 0, `100%`]}>
          <Container limit="x">
            <Interviewees>
              {story.interviewees.map((interviewee, i) => (
                <Interviewee
                  key={interviewee.id}
                  onClick={(e) => this.startChat(e, interviewee.id)}
                >
                  <Container dir="row">
                    <Container flex={[1, 0, "auto"]}>
                      <Avatar
                        size="l"
                        image={interviewee.avatar}
                        onClick={() =>
                          this.props.router.push(`/chat/${interviewee.id}`)
                        }
                      />
                    </Container>
                    <Container flex={[0, 1, "100%"]} align="left">
                      <Text typo="p1">{interviewee.name}</Text>
                      <Separator silent size="n" />
                      <IntervieweeTitle typo="p5">
                        {interviewee.title}
                      </IntervieweeTitle>
                    </Container>
                    <Container flex={[1, 0, "auto"]}>
                      <Tip title="Get info">
                        <Action
                          inverted
                          iconic
                          onClick={(e) => this.toggleIntervieweeModal(e, i)}
                        >
                          <Icon name="info" />
                        </Action>
                      </Tip>
                      <Tip title="Start chatting">
                        <Action
                          primary
                          iconic
                          onClick={(e) => this.startChat(e, interviewee.id)}
                        >
                          <Icon name="bubbles" />
                        </Action>
                      </Tip>
                    </Container>
                  </Container>
                </Interviewee>
              ))}
            </Interviewees>
          </Container>
        </PageBody>
        <PageFoot limit="m" flex={[1, 0, `${100 / 4}%`]}>
          <Actionbar>
            <Action
              fixed
              onClick={() =>
                this.props.router.push(`/chat/${story.interviewees[0].id}`)
              }
              primary
            >
              Start your first interview
            </Action>
          </Actionbar>
        </PageFoot>
      </Page>,
      this.state.intervieweeModal !== null ? (
        <IntervieweeModal
          {...this.props}
          handleClose={(e) => this.toggleIntervieweeModal(e, null)}
          interviewee={story.interviewees[this.state.intervieweeModal]}
          isOpen={this.state.intervieweeModal !== null}
          key="intervieweeModal"
        />
      ) : null
    ];
  }
}

ContextView.propTypes = {
  router: object,
  story: shape({
    title: string
  })
};

ContextView.defaultProps = {
  router: null,
  story: {}
};