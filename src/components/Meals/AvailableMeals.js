import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';
import styles from './AvailableMeals.module.css'
import MealItem from './MealItem/MealItem';

function AvailableMeals() {

    const [meals, setMeals] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState()

    useEffect(() => {
        const fetchMeals = async () => {
            const response = await fetch('https://foodcart-56fe6-default-rtdb.firebaseio.com/meals.json')
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Something went wrong')
            }

            const loadedMeals = []

            for (const key in data) {
                loadedMeals.push({
                    id: key,
                    name: data[key].name,
                    description: data[key].description,
                    price: data[key].price
                })
            }

            setMeals(loadedMeals)
            setLoading(false)
        }
        fetchMeals().catch((error) => {
            setLoading(false)
            setError(error.message)
        });
    }, [])

    if (loading) {
        return (
            <section>
                <p >Loading...</p>
            </section >
        )
    }
    if (error) {
        return (
            <section>
                <p>{error}</p>
            </section>
        )
    }

    const mealList = meals.map((meal) => (
        <MealItem
            id={meal.id}
            key={meal.id}
            name={meal.name}
            description={meal.description}
            price={meal.price} />
    ))

    return (
        <section className={styles.meals}>
            <Card>
                <ul>
                    {mealList}
                </ul>
            </Card>
        </section >
    )
}

export default AvailableMeals
