import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
  Label
} from "reactstrap";
import { Loading } from './LoadingComponent';
import { Control, LocalForm, Errors } from "react-redux-form";
import { Link } from "react-router-dom";
import { baseUrl } from '../shared/baseUrl';

const required = val => val && val.length; //tests if field has something in it and returns true if it does and false if it doesn't and will create an error
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false
    };
    this.toggleModal = this.toggleModal.bind(this);
  }

  handleSubmit(values) {
    this.toggleModal();
    this.props.postComment(
      this.props.campsiteId,
      values.rating,
      values.author,
      values.text
    );
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    return (
      <React.Fragment>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={values => this.handleSubmit(values)}>
              <div>
                <Label htmlFor="rating">Rating</Label>
              </div>
              <div className="form-group">
                <Control.select model="user.faveColor" id="user.faveColor">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </Control.select>
                <Errors
                  className="text-danger"
                  model=".rating"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required"
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="author">Your Name</Label>
                <Control.text
                  model=".author"
                  id="author"
                  name="author"
                  placeholder="Your Name"
                  className="form-control"
                  validators={{
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(15)
                  }}
                />
                <Errors
                  className="text-danger"
                  model=".author"
                  show="touched"
                  component="div"
                  messages={{
                    required: "Required",
                    minLength: "Must be at least 2 characters",
                    maxLength: "Must be 15 characters or less"
                  }}
                />
              </div>

              <div className="form-group">
                <Label htmlFor="text">Your Feedback</Label>
                <Control.textarea
                  model=".text"
                  id="text"
                  name="text"
                  rows="6"
                  className="form-control"
                />
              </div>

              <div className="form-group">
                {/* <Col md={{ size: 10, offset: 2 }}> */}
                <Button type="submit" color="primary">
                  Send Feedback
                </Button>
              </div>
            </LocalForm>
          </ModalBody>
        </Modal>

        <Button outline onClick={this.toggleModal}>
          <i class="fa fa-pencil" aria-hidden="true">
            {" "}
            Submit Comment
          </i>
        </Button>
      </React.Fragment>
    );
  }
}

function RenderCampsite({ campsite }) {
  return (
    <div className="col-md-5 m-1">
      <Card>
        <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
        <CardBody>
          <CardText>{campsite.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments, postComment, campsiteId }) {
  if (comments) {
    return (
      <div className="col-md-5 m-1">
        <h4>Comments</h4>
        {comments.map(comment => (
          <div key={comment.id}>
            <div>{comment.text}</div>
            <div className="mb-3">
              -- {comment.author},{" "}
              {new Intl.DateTimeFormat("en-US", {
                year: "numeric",
                month: "short",
                day: "2-digit"
              }).format(new Date(Date.parse(comment.date)))}
            </div>
          </div>
        ))}
        <CommentForm campsiteId={campsiteId} postComment={postComment} />
      </div>
    );
  }
  return <div></div>;
}

function CampsiteInfo(props) {
  if (props.isLoading) {
    return (
      <div className="container">
        <div className="row">
          <Loading />
        </div>
      </div>
    );
  }
  if (props.errMess) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <h4>{props.errMess}</h4>
          </div>
        </div>
      </div>
    );
  }
  if (props.campsite) {
    return (
      <div className="container">
        <div className="row">
          <div className="col">
            <Breadcrumb>
              <BreadcrumbItem>
                <Link to="/directory">Directory</Link>
              </BreadcrumbItem>
              <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
            </Breadcrumb>
            <h2>{props.campsite.name}</h2>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderCampsite campsite={props.campsite} />
          <RenderComments
            comments={props.comments}
            postComment={props.postComment}
            campsiteId={props.campsite.id}
          />
        </div>
      </div>
    );
  }
  return <div></div>;
}

export default CampsiteInfo;
