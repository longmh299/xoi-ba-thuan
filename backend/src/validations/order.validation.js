import Joi from "joi";

export const createOrderSchema = Joi.object({
  customerName: Joi.string().trim().min(2).max(50).required(),

  phone: Joi.string().trim().required(),

  receiveType: Joi.string()
    .valid("PICKUP", "DELIVERY")
    .required(),

  address: Joi.when("receiveType", {
    is: "DELIVERY",
    then: Joi.string().trim().required(),
    otherwise: Joi.string().allow("", null),
  }),

  note: Joi.string().allow("", null),

  shippingNote: Joi.string().allow("", null),

  items: Joi.array()
    .items(
      Joi.object({
        foodVariantId: Joi.string().required(),

        quantity: Joi.number().integer().min(1).required(),

        toppings: Joi.array()
          .items(
            Joi.object({
              toppingId: Joi.string().required(),

              quantity: Joi.number().integer().min(1).default(1),
            })
          )
          .default([]),
      })
    )
    .min(1)
    .required(),
});