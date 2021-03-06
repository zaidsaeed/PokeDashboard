import React from "react";
import { Button } from "react-bootstrap/lib/";
import ReactModal from "react-modal";
import PokemonInfo from "./PokemonInfo";

const PokemonModal = ({ showModal, closeModal, pokemon }) => {
  console.log(pokemon);
  return (
    <div className="modal-container" style={{ height: 200 }}>
      <ReactModal
        isOpen={showModal}
        onHide={closeModal}
        aria-labelledby="contained-modal-title"
        ariaHideApp={false}
        style={{ maxHeight: "50%" }}
      >
        <h1 id="pokemon-modal-title">
          {" "}
          {pokemon !== null ? pokemon.name : "Loading..."}{" "}
        </h1>
        <hr />
        {pokemon !== null ? (
          <PokemonInfo pokemon={pokemon} />
        ) : (
          "Pokemon does not exist"
        )}
        <hr />
        <Button
          id="exit-modal-button"
          bsStyle="primary"
          bsSize="large"
          onClick={closeModal}
        >
          {" "}
          Exit Modal{" "}
        </Button>
      </ReactModal>
    </div>
  );
};

export default PokemonModal;
