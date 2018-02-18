import React from "react";

import Pagination from "./Pagination";
import PokeList from "./PokeList";
import SelectItemsPerPageButtons from "./SelectItemsPerPageButtons";

const PokemonIndexList = ({
  display,
  selectedValue,
  allValue,
  onOptionSelected,
  listOfPokemon,
  totalPages,
  handlePaginationSelect
}) => {
  const style = { display: "none" };
  if (display) {
    style.display = "initial";
  }
  return (
    <div style={style}>
      <SelectItemsPerPageButtons
        options={[10, 50, 100, 200]}
        selectedValue={selectedValue}
        allValue={allValue}
        onOptionSelected={onOptionSelected}
      />
      <PokeList listOfPokemon={listOfPokemon} />
      <Pagination
        totalPages={totalPages}
        handlePaginationSelect={handlePaginationSelect}
      />
    </div>
  );
};

export default PokemonIndexList;
