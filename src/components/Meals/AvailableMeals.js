import React, { useState, useEffect } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const fetchMealsHandler = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://react-project-501a3-default-rtdb.firebaseio.com/meals.json"
      );
      if (!response.ok) {
        throw new Error("something went error");
      }
      const data = await response.json();
      const loadMeals = [];
      for (const key in data) {
        loadMeals.push({
          id: key,
          name: data[key].name,
          description: data[key].description,
          price: data[key].price,
        });
        setMeals(loadMeals);
      }
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMealsHandler();
  }, []);

  let content = "";
  if (error) {
    content = <p>{error}</p>;
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        {isLoading && <p> Meals is Loading ...</p>}
        <ul>{mealsList}</ul>
        {content}
      </Card>
    </section>
  );
};

export default AvailableMeals;
