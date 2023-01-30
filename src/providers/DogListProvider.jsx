import React, { createContext, useContext, useEffect, useState } from "react";
import { addDogToDb } from "../fetch/add-dog";
import { deleteDogFromDb } from "../fetch/delete-dog-from-db";
import { updateFavoriteForDog } from "../fetch/update-favorite";

export const DogListContext = createContext({});

export const DogListProvider = ({ children }) => {
  const [showComponent, setShowComponent] = useState("all-dogs");
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    refetchDogs();
  }, []);

  const refetchDogs = () => {
    fetch("http://localhost:3000/dogs")
      .then((response) => response.json())
      .then(setDogs);
  };

  const addDog = (dog) => {
    addDogToDb({
      name: dog.name,
      description: dog.description,
      image: dog.image,
    }).then(() => {
      refetchDogs();
    });
  };

  const deleteDog = (dogId) => {
    deleteDogFromDb(dogId).then(() => refetchDogs());
  };

  const unfavoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: false }).then(() =>
      refetchDogs()
    );
  };

  const favoriteDog = (dogId) => {
    updateFavoriteForDog({ dogId, isFavorite: true }).then(() => refetchDogs());
  };

  const unfavorited = dogs.filter((dog) => dog.isFavorite === false);
  const favorited = dogs.filter((dog) => dog.isFavorite === true);
  const favoriteDogCount = dogs.filter((dog) => dog.isFavorite).length;
  const unfavoriteDogCount = dogs.filter((dog) => !dog.isFavorite).length;

  let filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("favorite-dogs");
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("unfavorite-dogs");
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("create-dog-form");
  };

  return (
    <DogListContext.Provider
      value={{
        dogs,
        filteredDogs,
        showComponent,
        favoriteDogCount,
        unfavoriteDogCount,
        addDog,
        deleteDog,
        unfavoriteDog,
        favoriteDog,
        onClickFavorited,
        onClickUnfavorited,
        onClickCreateDog,
      }}
    >
      {children}
    </DogListContext.Provider>
  );
};

export const useDogList = () => {
  const context = useContext(DogListContext);
  return {
    dogs: context.dogs,
    filteredDogs: context.filteredDogs,
    showComponent: context.showComponent,
    favoriteDogCount: context.favoriteDogCount,
    unfavoriteDogCount: context.unfavoriteDogCount,
    addDog: context.addDog,
    deleteDog: context.deleteDog,
    unfavoriteDog: context.unfavoriteDog,
    favoriteDog: context.favoriteDog,
    onClickFavorited: context.onClickFavorited,
    onClickUnfavorited: context.onClickUnfavorited,
    onClickCreateDog: context.onClickCreateDog,
  };
};
