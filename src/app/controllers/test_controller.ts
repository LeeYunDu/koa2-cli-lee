export const testPost = async (ctx: any) => {
  ctx.body = {
    message: "this is test Post",
    data:new Date()
  };
};





