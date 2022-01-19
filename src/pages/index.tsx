import { useState } from "react";
import type { NextPage } from "next";
import { trpc } from "@/utils/trpc";
import { getOptionsForVote } from "@/utils/getRandomPokemon";

const Home: NextPage = () => {
  const [ids, setIds] = useState(() => getOptionsForVote());
  const [first, second] = ids;
  const firstPokemon = trpc.useQuery(["get-pokemon-by-id", { id: first }]);
  const secondPokemon = trpc.useQuery(["get-pokemon-by-id", { id: second }]);

  // console.log("firstPokemon", firstPokemon);
  if (firstPokemon.isLoading || secondPokemon.isLoading) return null;

  return (
    <div className="h-screen w-screen flex flex-col justify-center align-center items-center">
      <div className="text-2x1 text-center">Which Pokemón is Smaller?</div>
      <div className="p-2"></div>
      <div className="border rounded p-8 flex items-center justify-between max-w-2x1">
        <div className="w-64 h-64 flex flex-col">
          <img
            src={firstPokemon.data?.sprites.front_default!}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {firstPokemon.data?.name}
          </div>
        </div>
        <div className="p-8">Vs</div>
        <div className="w-64 h-64 flex flex-col">
          <img
            src={secondPokemon.data?.sprites.front_default!}
            className="w-full"
          />
          <div className="text-xl text-center capitalize mt-[-2rem]">
            {secondPokemon.data?.name}
          </div>
          <div className="p-2"></div>
        </div>
      </div>
    </div>
  );
};

export default Home;
