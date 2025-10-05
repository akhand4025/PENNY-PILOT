const zod= require("zod")
const createexpense=zod.object({
    title:zod.string(),
    amount:zod.number(),
     date: zod.string().transform((str) => new Date(str)),
    description:zod.string()
})

const info=zod.object({
    name:zod.string(),
    password:zod.string()
})

module.exports={createexpense,info}