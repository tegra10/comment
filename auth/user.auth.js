"use strisct";
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model.js");

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ where: { email } });
        if (!user) {
            return res
                .status(401)
                .json({ message: "Email ou mot de passe incorrect" });
        }
        
        const isValid = await user.verifyPassword(password);
        if (!isValid) {
            return res.status(401).json({ message: 'Email ou mot de passe incorrect' });
        }

        // Générer un token JWT
        const token = jwt.sign({ userId: user.id }, 'votre_cle_secrete_ici', { expiresIn: '1h' });

        return res.json({ token });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Une erreur est survenue' });
    }
    
}
module.exports.getOneUser = async (req, res) => {
    const { id } = req.params;
};
module.exports.logout = async (req, res) => {};
