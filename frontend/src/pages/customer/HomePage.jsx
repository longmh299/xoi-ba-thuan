import { useEffect, useMemo, useState } from "react";

import BottomNav from "../../components/customer/BottomNav";
import VariantModal from "../../components/customer/VariantModal";
import CartBar from "../../components/customer/CartBar";
import HomeHeader from "../../components/customer/HomeHeader";
import FoodCard from "../../components/customer/FoodCard";

import { getHome } from "../../api/home.api";

export default function HomePage() {
    const [loading, setLoading] = useState(true);

    const [selectedFood, setSelectedFood] =
        useState(null);

    const [shop, setShop] = useState(null);

    const [categories, setCategories] =
        useState([]);

    const [foods, setFoods] =
        useState([]);

    const [selectedCategory, setSelectedCategory] =
        useState("all");

    async function loadHome() {
        try {
            const res = await getHome();

            const data = res.data.data;

            setShop(data.shop);
            setCategories(data.categories);
            setFoods(data.foods);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadHome();
    }, []);

    function handleAdd(food) {
        setSelectedFood(food);
    }

    const filteredFoods = useMemo(() => {
        if (selectedCategory === "all") {
            return foods;
        }

        return foods.filter(
            (food) =>
                String(food.category?.id) ===
                String(selectedCategory)
        );
    }, [foods, selectedCategory]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                Đang tải...
            </div>
        );
    }

    return (
        <div className="h-screen bg-slate-100 flex flex-col overflow-hidden">

            {/* Header */}

            <HomeHeader shop={shop} />

            {/* Category */}

            <div
                className="
                    flex
                    gap-3
                    overflow-x-auto
                    px-4
                    py-4
                    scrollbar-hide
                    shrink-0
                "
            >
                <button
                    onClick={() =>
                        setSelectedCategory("all")
                    }
                    className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition ${
                        selectedCategory === "all"
                            ? "bg-orange-500 text-white shadow"
                            : "bg-white shadow-sm"
                    }`}
                >
                    Tất cả
                </button>

                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() =>
                            setSelectedCategory(category.id)
                        }
                        className={`px-5 py-2 rounded-full whitespace-nowrap font-medium transition ${
                            String(selectedCategory) ===
                            String(category.id)
                                ? "bg-orange-500 text-white shadow"
                                : "bg-white shadow-sm"
                        }`}
                    >
                        {category.name}
                    </button>
                ))}
            </div>

            {/* Food List */}

            <div
                className="
                    flex-1
                    overflow-y-auto
                    px-4
                    pb-36
                "
            >
                <div className="space-y-5">

                    {filteredFoods.length === 0 ? (
                        <div className="bg-white rounded-3xl p-10 text-center text-gray-400 shadow">
                            Chưa có món trong danh mục này.
                        </div>
                    ) : (
                        filteredFoods.map((food) => (
                            <FoodCard
                                key={food.id}
                                food={food}
                                onAdd={handleAdd}
                            />
                        ))
                    )}

                </div>
            </div>

            <VariantModal
                open={!!selectedFood}
                food={selectedFood}
                onClose={() =>
                    setSelectedFood(null)
                }
            />

            <CartBar />

            <BottomNav />

        </div>
    );
}