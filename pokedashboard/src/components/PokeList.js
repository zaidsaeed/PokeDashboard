import React from "react";
import { ListGroup, ListGroupItem, Col, Grid, Row } from "react-bootstrap/lib/";

const PokeList = ({ listOfPokemon }) => {
  let split = Math.floor(listOfPokemon.length / 3);
  let pokemon = listOfPokemon.map(creature => {
    return (
      <ListGroupItem className="PokeList-item">{creature.name}</ListGroupItem>
    );
  });

  return (
    <Grid>
      <Row>
        <Col sm={4}>
          <ListGroup>{pokemon.slice(0, split - 1)}</ListGroup>
        </Col>
        <Col sm={4}>
          <ListGroup>{pokemon.slice(split, 2 * split - 1)}</ListGroup>
        </Col>
        <Col sm={4}>
          <ListGroup>{pokemon.slice(2 * split, 3 * split - 1)}</ListGroup>
        </Col>
      </Row>
    </Grid>
  );
};

export default PokeList;
