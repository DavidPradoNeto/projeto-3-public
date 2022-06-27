import { sign } from "jsonwebtoken";
import User from "../schemas/User";
import { compare } from "bcryptjs";

class SessionController {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({ erro: "Usuario ou Senha Invalidos!" });
    }

    const matchPassword = await compare(password, user.password);

    if (!matchPassword) {
      return response.status(404).json({ erro: "Usuario ou Senha Invalidos!" });
    }

    const token = sign({}, "segredo", {
      subject: user.email,
      expiresIn: "1d",
    });
    
    return response.json({
      token
    });
  }
}

export default new SessionController();
