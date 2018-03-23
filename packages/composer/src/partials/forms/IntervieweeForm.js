import { bool, func, shape, string } from "prop-types";
import { SketchPicker } from "react-color";
import css from "styled-components";
import Dropzone from "react-dropzone";
import React, { Component } from "react";
import Pica from "pica/dist/pica";

import {
  Action,
  Actionbar,
  CharacterCount,
  Container,
  Dropdown,
  DropdownContent,
  Form,
  FormItem,
  Icon,
  Label,
  Legend,
  PageParagraph,
  PageSubtitle,
  Separator,
  TextInput,
  Tip
} from "interviewjs-styleguide";

import validateField from "./validateField";

const ColorPickerWrapper = css.span`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 1000;
`;


export default class IntervieweeForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: this.props.interviewee,
      formValidation: {
        name: null,
        title: null
      },
      moreDropdown: false,
      colorPicker: false,
      colorPicking: false
    };
    this.deleteInterviewee = this.deleteInterviewee.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeColor = this.handleChangeColor.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleDropdown = this.toggleDropdown.bind(this);
  }

  handleSubmit(e) {
    if (e) e.preventDefault();
    this.props.handleSubmit(this.state.formData);
  }

  handleChange(e) {
    this.setState({
      formData: { ...this.state.formData, [e.target.name]: e.target.value }
    });
  }

  handleChangeColor(color) {
    this.setState({
      formData: { ...this.state.formData, color: color.hex }
    });
    setTimeout(
      () =>
        this.setState({
          colorPicking: false
        }),
      350
    );
  }

  handleFile(f) {
    const { preview } = f[0];
    const offScreenImage = document.createElement('img');
    offScreenImage.addEventListener('load', () => {
      const targetWidth = offScreenImage.width > 300 ? 300 : offScreenImage.width;
      const targetHeight = parseInt(targetWidth * offScreenImage.height / offScreenImage.width, 10);
      console.log(`${offScreenImage.width} x ${offScreenImage.height} => ${targetWidth} x ${targetHeight}`);

      const offScreenCanvas = document.createElement('canvas');
      offScreenCanvas.width  = targetWidth;
      offScreenCanvas.height = targetHeight;

      const pica = Pica({ features: ['js', 'wasm', 'ww'] });
      pica.resize(offScreenImage, offScreenCanvas, {
        unsharpAmount: 80,
        unsharpRadius: 0.6,
        unsharpThreshold: 2,
        transferable: true
      }).then(result => pica.toBlob(result, 'image/jpeg', 0.90))
        .then(blob => {
          const reader = new FileReader();
          reader.onloadend = () => {
            console.log("data url length", reader.result.length);
            const base64data = reader.result.length > 3e6 ? '' : reader.result;
            this.setState({
              formData: { ...this.state.formData, avatar: base64data }
            });
          };
          reader.readAsDataURL(blob);
        }).catch(error => console.log(error));
    });
    offScreenImage.src = preview;
  }

  handleBlur(e) {
    const { target } = e;
    const { name } = target;
    this.setState({
      formValidation: {
        ...this.state.formValidation,
        [name]: validateField(target)
      }
    });
  }

  toggleDropdown(dropdown, e) {
    if (e) e.preventDefault();
    this.setState({ [dropdown]: !this.state[dropdown] });
  }

  deleteInterviewee() {
    this.props.deleteInterviewee();
    this.setState({ moreDropdown: false });
    this.props.handleCancel(); // TODO used to close the parent modal, rename to something like `handleClose`, `handleCancel` is confusing.
  }

  render() {
    const deleteOption = (
      <Dropdown
        html={
          <DropdownContent>
            <PageSubtitle typo="p4">
              Sure to delete this interviewee permanently?
            </PageSubtitle>
            <Separator silent size="x" />
            <PageParagraph typo="p5">
              All related data including transcript and storyline will be
              irreversibly lost.
            </PageParagraph>
            <Separator silent size="x" />
            <Actionbar>
              <Action onClick={() => this.toggleDropdown("moreDropdown")}>
                Cancel
              </Action>
              <Action tone="negative" onClick={this.deleteInterviewee}>
                Delete
              </Action>
            </Actionbar>
          </DropdownContent>
        }
        onRequestClose={() => this.toggleDropdown("moreDropdown")}
        open={this.state.moreDropdown}
        position="left"
      >
        <Tip position="bottom" title="Delete interviewee">
          <Action
            iconic
            onClick={(e) => this.toggleDropdown("moreDropdown", e)}
            secondary
            tone="negative"
          >
            <Icon name="remove-persona" />
          </Action>
        </Tip>
      </Dropdown>
    );
    return (
      <Form onSubmit={(e) => this.handleSubmit(e)}>
        <FormItem>
          <Label>Name</Label>
          <CharacterCount>
            {35 - this.state.formData.name.length}
          </CharacterCount>
          <TextInput
            input
            maxLength="35"
            minLength="1"
            name="name"
            onBlur={(e) => this.handleBlur(e)}
            onChange={(e) => this.handleChange(e)}
            placeholder="Name of interviewee"
            required
            valid={this.state.formValidation.name}
            value={
              this.state.formData.name === "Name of interviewee"
                ? ""
                : this.state.formData.name
            }
          />
          <Legend tip="Name of your interviewee">i</Legend>
        </FormItem>
        <Separator size="m" silent />
        <FormItem>
          <Label>Title</Label>
          <CharacterCount>
            {80 - this.state.formData.title.length}
          </CharacterCount>
          <TextInput
            input
            maxLength="80"
            minLength="1"
            name="title"
            onBlur={(e) => this.handleBlur(e)}
            onChange={(e) => this.handleChange(e)}
            placeholder="Title e.g. President, Farmer, Mother"
            required
            valid={this.state.formValidation.title}
            value={this.state.formData.title}
          />
          <Legend tip="Title e.g. President, Farmer, Mother">i</Legend>
        </FormItem>
        <Separator size="m" silent />
        <FormItem>
          <Label>Bio</Label>
          <CharacterCount>
            {300 - this.state.formData.bio.length}
          </CharacterCount>
          <TextInput
            area
            maxLength="300"
            name="bio"
            onChange={(e) => this.handleChange(e)}
            placeholder="Who is this person and why is s/he important in this story?"
            value={this.state.formData.bio}
          />
          <Legend
            tip="Who is this and what role does this person have in your story?
            Does s/he have a particular view on the issues raised?"
          >
            i
          </Legend>
        </FormItem>
        <Separator size="m" silent />
        <Container dir="row">
          <Container flex={[0, 0, "50%"]}>
            <FormItem>
              <Label>Profile image</Label>
              <Dropzone
                accept="image/jpeg, image/jpg, image/svg, image/gif, image/png"
                ref={(node) => {
                  this.dropzoneRef = node;
                }}
                onDrop={(accepted) => {
                  this.handleFile(accepted);
                }}
                style={{ display: "none" }}
              >
                <p>Drop file here</p>
              </Dropzone>
              <TextInput
                file
                place="left"
                onClick={() => {
                  this.dropzoneRef.open();
                }}
              />
              <Legend tip="Is there a photo of the person and do you have permission to use it?">
                i
              </Legend>
            </FormItem>
          </Container>
          <Container flex={[0, 0, "50%"]}>
            <FormItem>
              <Label>Colour</Label>
              <TextInput
                input
                place="right"
                placeholder="i.e. #495abd, red…"
                name="color"
                onClick={() => this.setState({ colorPicker: true })}
                onBlur={
                  this.state.colorPicking
                    ? null
                    : () => this.setState({ colorPicker: false })
                }
                value={this.state.formData.color}
                nooffset
              />
              {this.state.colorPicker ? (
                <ColorPickerWrapper>
                  <SketchPicker
                    disableAlpha
                    color={this.state.formData.color}
                    onChangeComplete={this.handleChangeColor}
                  />
                </ColorPickerWrapper>
              ) : null}
              <Legend tip="Choose the colour of this person’s chat text bubbles">
                i
              </Legend>
            </FormItem>
          </Container>
        </Container>
        <Separator size="m" silent />
        <Actionbar
          satellite={this.props.allowDelete ? "right" : null} // this goes inline with deleteOption
        >
          {!this.props.persistent ? (
            <Action fixed secondary onClick={this.props.handleCancel}>
              Cancel
            </Action>
          ) : null}
          <Action fixed primary type="submit">
            Save interviewee
          </Action>
          {this.props.allowDelete
            ? deleteOption
            : null /* this goes inline with satellite={this.props.deleteInterviewee === !null */}
        </Actionbar>
      </Form>
    );
  }
}

IntervieweeForm.propTypes = {
  allowDelete: bool,
  handleCancel: func,
  deleteInterviewee: func,
  handleSubmit: func.isRequired,
  persistent: bool,
  interviewee: shape({
    avatar: string,
    bio: string,
    color: string,
    name: string,
    title: string
  })
};

IntervieweeForm.defaultProps = {
  allowDelete: false,
  handleCancel: null,
  deleteInterviewee: null,
  interviewee: {
    avatar: "",
    bio: "",
    color: "",
    name: "",
    title: ""
  },
  persistent: false
};
