import z from "zod";

export const validateFollower=z.object({
    leader_id:z.number(),
    follower_id:z.number()
}).refine((data)=>{
    return( (data.follower_id!=data.leader_id) &&(data.follower_id &&data.leader_id));
},
 {
    message:"the follwer_id and leader_id has th same number they must be differnet",
    path:["follow"]
 }
)