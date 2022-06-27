import { verify } from "jsonwebtoken";

export default async(request, response, next) => {
    const authHeader = request.headers.authorization;

    if(!authHeader){
        return response.status(401).json({error: "Nao autorizado!"});
    }

    const [, token] = authHeader.split(" ");

    try{
        const decoded = verify(token, "segredo");
        
        return next();
    }catch(err) {
        return response.status(401).json({error: "Token Invalido!"});
    }
    
};