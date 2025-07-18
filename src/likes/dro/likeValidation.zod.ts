import {z} from 'zod';

export const likesValidation=z.object({
    post_id:z.number().optional(),
    comment_id:z.number().optional()

}).refine((data)=>{
    return(
        (data.comment_id&&!data.post_id) || (!data.comment_id&&data.post_id)
    )
},{
    message:"you must like on this either post or comment",
    path:['post_id']
})
