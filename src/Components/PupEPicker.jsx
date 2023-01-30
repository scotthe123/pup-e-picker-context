import React from "react";
import { useDogList } from "../providers/DogListProvider";
import { CreateDogForm } from "./CreateDogForm";
import { Dogs } from "./Dogs";
import { Section } from "./Section";

export const PupEPicker = () => {
  const { showComponent } = useDogList();
  return (
    <>
      <header>
        <h1>pup-e-picker</h1>
      </header>
      <Section label={"Dogs: "}>
        {["all-dogs", "favorite-dogs", "unfavorite-dogs"].includes(
          showComponent
        ) && <Dogs label={"All Dogs"} />}
        {showComponent === "create-dog-form" && <CreateDogForm />}
      </Section>
    </>
  );
};
