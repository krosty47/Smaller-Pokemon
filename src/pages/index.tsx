import { useState, FC } from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";
import { inferQueryResponse } from "./api/trpc/[trpc]";

const btn =
  "bg-white hover:bg-gray-100 text-gray-800 font-semibold py-1 px-1 border border-gray-400 rounded shadow";

export default () => {
  const [ids, setIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);
  const voteMutation = trpc.useMutation(["cast-vote"]);

  const voteForRoundest = (selected: number) => {
    if (selected === first) {
      voteMutation.mutate({ votedFor: first, votedAgainst: second });
    } else {
      voteMutation.mutate({ votedFor: second, votedAgainst: first });
    }
    setIds(getOptionsForVote());
  };


  return (
    <div className="h-screen w-screen flex flex-col justify-center align-center items-center">
      <div className="text-2x1 text-center">Which Pokemón is Smaller?</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 flex items-center justify-between max-w-2x1">
        {!firstPokemon.isLoading &&
          firstPokemon.data &&
          !secondPokemon.isLoading &&
          secondPokemon.data && (
            <>
              <PokemonListing
                pokemon={firstPokemon.data}
                vote={() => voteForRoundest(first)}
              />
              <div className="p-8">Vs</div>
              <PokemonListing
                pokemon={secondPokemon.data}
                vote={() => voteForRoundest(second)}
              />
            </>
          )}
        <div className="p-2"></div>
      </div>
    </div>
  );
};

type PokemonFromServer = inferQueryResponse<"get-pokemon-by-id">;

const PokemonListing: FC<{ pokemon: PokemonFromServer; vote: () => void }> = (
  props
) => {
  return (
    <div className="flex flex-col items-center">
      <img src={props.pokemon.sprites.front_default!} className="w-64 h-64" />
      <div className="text-xl text-center capitalize mt-[-2rem]">
        {props.pokemon.name}
      </div>
      <button className={btn} onClick={() => props.vote()}>
        Rounder
      </button>
    </div>
  );
};
