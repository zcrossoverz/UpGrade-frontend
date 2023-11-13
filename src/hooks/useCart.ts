/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const getCart = (): {
  title: string;
  lecturer: string;
  price: number;
  thumbnail_image: string;
  course_id: number;
}[] => {
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

const setCart = (
  cartArr: {
    title: string;
    lecturer: string;
    price: number;
    thumbnail_image: string;
    course_id: number;
  }[]
) => {
  localStorage.setItem("cart", JSON.stringify(cartArr));
};

const key_get_cart = "get_cart";

export const useCart = (course_id?: number) => {
  const queryClient = useQueryClient();

  const { data: cart } = useQuery([key_get_cart], getCart);

  const isCourseInCart = (courseId: number): boolean => {
    return (cart || []).some((item) => item.course_id === courseId);
  };

  const totalPrice = () => {
    return (cart || []).reduce((total, item) => total + item.price, 0);
  };

  const updateCart = useMutation(
    (newCart: any) => {
      return new Promise((resolve, _reject) => {
        setCart(newCart);
        resolve(newCart);
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([key_get_cart]);
      },
    }
  );

  const deleteItem = useMutation(
    (courseId: number) => {
      return new Promise((resolve, _reject) => {
        const newCart = getCart().filter((item) => item.course_id !== courseId);
        setCart(newCart);
        resolve(newCart);
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries([key_get_cart]);
      },
    }
  );

  const addItem = useMutation(
    (item: {
      title: string;
      lecturer: string;
      price: number;
      thumbnail_image: string;
      course_id: number;
    }) => {
      return new Promise((resolve, _reject) => {
        const newCart = getCart();
        newCart.push(item);
        setCart(newCart);
        resolve(newCart);
      });
    },
    {
      onSuccess: () => {
        queryClient.refetchQueries([key_get_cart]);
        queryClient.refetchQueries(["course", course_id]);
      },
    }
  );

  return {
    cart,
    updateCart: updateCart.mutate,
    addItem: addItem.mutate,
    isCourseInCart,
    deleteItem: deleteItem.mutate,
    totalPrice,
  };
};
