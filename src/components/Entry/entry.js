import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Heading, InnerContainer, Input, OuterContainer } from './entryStyles';

const Entry = () => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <OuterContainer>
      <InnerContainer>
        <Heading>Join</Heading>
        <div>
          <Input placeholder="Name" type="text" onChange={(event) => setName(event.target.value)} />
        </div>
        <div>
          <Input placeholder="Room" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <Link
          onClick={(e) => (!name || !room ? e.preventDefault() : null)}
          to={`/game?name=${name}&room=${room}`}
        >
          <Button type="submit">Join</Button>
        </Link>
      </InnerContainer>
    </OuterContainer>
  );
};

export default Entry;
