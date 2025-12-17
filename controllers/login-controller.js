import knexinit from "knex";
import knexConfig from "../knexfile.js";

const knex = knexinit(knexConfig);

const userCheck = async (useremail, firstName, lastName = "") => {
    let userid = null;
    try{
    const data = await knex("user").where("email_id",useremail.trim());
    
    if(!data.length){
        const lastUser = await knex("user").orderBy("user_id","desc").first();
        //.log("Last user id: ", lastUser.user_id);
         userid = await addUser({user_id: lastUser.user_id + 1,
            email_id: useremail,
            password: "",
            first_name: firstName,
            last_name: lastName
        });
        
    }else{
        userid = data[0].user_id;
    }
    }catch(error){
        console.log("Error creating/finding a user", error);
    }finally{

    return userid;
}
}

const addUser = async(userdata) =>{
   try{let userId =  await knex("user").insert(userdata);
    console.log("User added: ", userId);
    return userId[0];
}catch(error){
    console.log("Error adding user: ", error);
}
   
}

export{ userCheck };