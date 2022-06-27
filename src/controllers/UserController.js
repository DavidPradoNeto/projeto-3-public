import User from "../schemas/User";

class UserController {
  async create(request, response) {
    const { nome, email, password } = request.body;


    const userDb = await User.findOne({ email });

    if (userDb) {
      return response.status(200).json({ erro: "Usuario ja cadastrado!" });
    }
    
    try{
    const user = await User.create({
      nome,
      email,
      password: password,
    });
    
    return response.status(201).json({data: "Cadastrado com sucesso"});
  }catch(err){};
  }

  async usuarioLogado(request,response) {

    const { email } = request.body;

    const user = await User.findOne({ email });
    
    if(!user){
      return response.status(401).json({ erro: "ERROR" });
    }


    return response.json(user.nome);
  }

}

export default new UserController();
