import React from 'react';
import {withTracker} from 'meteor/react-meteor-data';
import {Session} from 'meteor/session';
import propTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';
// import {browserHistory} from '../routes/routes';

import {Notes} from '../api/notes';

export class Editor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: ''
    };
  }
  
  handleBodyChange(e) {
    const body = e.target.value;
    this.setState({body});
    this.props.call('notes.update' , this.props.note._id , {body});
  }

  handleTitleChange(e) {
    const title = e.target.value;
    this.setState({title});
    this.props.call('notes.update' , this.props.note._id , {title}); 
  }

  handleDeleteNote(e) {
    e.preventDefault();
    console.log('deleting note');
    const currentNoteId = this.props.note ? this.props.note._id : undefined;
    console.log(currentNoteId);
    if(currentNoteId) {
      this.props.call('notes.remove' , currentNoteId);
      // this.props.browserHistory.push('/dashboard');
      Session.set('selectedNoteId' , '');

    }
  }

  componentDidUpdate(prevProps, prevState){
    const currentNoteId  = this.props.note ? this.props.note._id : undefined;
    const prevNoteId = prevProps.note ? prevProps.note._id : undefined;

    if (currentNoteId && currentNoteId !== prevNoteId){
      this.setState({
        title: this.props.note.title,
        body: this.props.note.body
      });
    }
  }

  render() {
    if(this.props.note){
      return(
        <div>
          <input value={this.state.title} placeholder="Untitled Note" onChange={this.handleTitleChange.bind(this)}/>
          <textarea value={this.state.body} placeholder="Add your note!" onChange={this.handleBodyChange.bind(this)}></textarea>
          <button onClick={this.handleDeleteNote.bind(this)}>Delete Note</button>
        </div>
      )
    } else {
      return (
        <p>{this.props.selectedNoteId ? 'Note not found!' : 'Pick a note to get started!'}</p>
      ); 
    }
  }
}

Editor.propTypes = {
  note: propTypes.object,
  selectedNoteId: propTypes.string,
  call: propTypes.func.isRequired
  // browserHistory: propTypes.object.isRequired
}

export default withTracker(() => {
  const selectedNoteId = Session.get('selectedNoteId');
  return {
    selectedNoteId,
    note: Notes.findOne(selectedNoteId),
    call: Meteor.call
    // browserHistory
  };
})(Editor);