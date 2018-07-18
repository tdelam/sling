import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchRooms, createRoom, joinRoom } from '../../actions/rooms';
import { css, StyleSheet } from 'aphrodite';
import NewRoomForm from '../../components/NewRoomForm';
import Navbar from '../../components/Navbar';
import RoomListItem from '../../components/RoomListItem';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

type Room = {
  id: number,
  name: string,
}

type Props = {
  rooms: Array<Room>,
  currentUserRooms: Array<Room>,
  fetchRooms: () => void,
  createRoom: () => void,
  joinRoom: () => void,
}

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleLogout = () => this.props.logout(this.context.router);
  
  handleNewRoomSubmit = data => this.props.createRoom(data, this.context.router);

  handleRoomJoin = roomId => this.props.joinRoom(roomId, this.context.router);

  renderRooms() {
    const currentUserRoomIds = [];
    this.props.currentUserRooms.map(room => currentUserRoomIds.push(room.id));

    return this.props.rooms.map(room =>
      <RoomListItem
        key={room.id}
        room={room}
        onRoomJoin={this.handleRoomJoin}
        currentUserRoomIds={currentUserRoomIds}
      />
    );
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create a new room</h3>
          <NewRoomForm onSubmit={this.handleNewRoomSubmit} />
        </div>
        <div className={`card ${css(styles.card)}`}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Join a room</h3>
          {this.renderRooms()}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    rooms: state.rooms.all,
    currentUserRooms: state.rooms.currentUserRooms,
  }),
  { fetchRooms, createRoom, joinRoom }
)(Home);