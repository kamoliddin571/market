const { CustomError } = require("../../lib/customError");
const { validater } = require("../../lib/validater");
const { myHashing } = require("../../lib/bcrypt");
const { authService } = require("./auth.service");
const { userService } = require("../user/user.service");
const { loginDto } = require("./dto/login-auth.dto");
const { registerDto } = require("./dto/register-auth.dto");
const { myJwt } = require("../../lib/jwt");
const { changePaaswordDto } = require("./dto/change-password-auth.dto");
const {
  forgotPasswordDto,
  verifyDto,
  changeForgotPasswordDto,
} = require("./dto/forgot-password-auth.dto");
const { generatedCode } = require("../../lib/generatedCode");
const { transporter } = require("../../lib/nodemalier");
const { config } = require("../../config");
const { ResData } = require("../../lib/resData");

class AuthController {
  #authService;
  #userService;
  #jwt;
  #myHashing;
  constructor(authService, userService, jwt, myHashing) {
    this.#authService = authService;
    this.#userService = userService;
    this.#jwt = jwt;
    this.#myHashing = myHashing;
  }

  async register(req, res, next) {
    try {
      const dto = req.body;

      validater(registerDto, dto);

      const { data: foundUserByLogin } = await this.#userService.getByLogin(
        dto.login
      );

      if (foundUserByLogin) {
        throw new CustomError(400, "User already exists");
      }

      const hashedPassword = await this.#myHashing.hash(dto.password);

      dto.role = "client";
      dto.password = hashedPassword;

      const { data: createdUser } = await this.#userService.create(dto);

      const resData = this.#authService.generateToken(createdUser);

      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      console.log(req.myIo);

      req.myIo.emit("login", { data: req.body });

      const dto = req.body;

      validater(loginDto, dto);

      const { data: foundUserByLogin } = await this.#userService.getByLogin(
        dto.login
      );

      if (!foundUserByLogin) {
        throw new CustomError(400, "login or password wrong!");
      }

      const isValidate = await this.#myHashing.isValidate(
        dto.password,
        foundUserByLogin.password
      );

      if (!isValidate) {
        throw new CustomError(400, "login or password wrong!");
      }

      const resData = this.#authService.generateToken(foundUserByLogin);

      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const token = req.headers.authorization;

      if (!token) {
        throw new CustomError(401, "authorization is required");
      }

      const [type, tokenValue] = token.split(" ");

      if (type !== "Bearer" || !tokenValue) {
        throw new CustomError(401, "authorization type must be Bearer");
      }

      const { id } = this.#jwt.verifyRefresh(tokenValue);

      const { data } = await this.#userService.getById(id);

      const resData = this.#authService.generateToken(data);

      res.status(resData.status).json(resData);
    } catch (error) {
      error.status = 401;
      next(error);
    }
  }

  async changePassword(req, res, next) {
    try {
      const dto = req.body;

      validater(changePaaswordDto, dto);

      if (dto.oldPassword === dto.newPassword) {
        throw new CustomError(
          400,
          "oldPassword must be different from newPassword"
        );
      }

      const currentUser = req.currentUser;

      const isValidPassword = await this.#myHashing.isValidate(
        dto.oldPassword,
        currentUser.password
      );

      if (!isValidPassword) {
        throw new CustomError(400, "oldPassword is wrong");
      }

      const hashedPassword = await this.#myHashing.hash(dto.newPassword);

      currentUser.password = hashedPassword;

      const resData = await this.#userService.update(
        currentUser._id,
        currentUser
      );

      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req, res, next) {
    try {
      const dto = req.body;

      validater(forgotPasswordDto, dto);

      const { data: foundUserByLogin } = await this.#userService.getByLogin(
        dto.email
      );

      if (!foundUserByLogin) {
        throw new CustomError(404, "User not found by email");
      }

      const code = generatedCode();

      const mailOptions = {
        from: config.EMAIL,
        to: dto.email,
        subject: "Password reset code",
        text: `Your password reset code is ${code}`,
      };

      await transporter.sendMail(mailOptions);

      foundUserByLogin.code = code;

      const { data: updateUserData } = await this.#userService.update(
        foundUserByLogin._id,
        foundUserByLogin
      );

      const resData = this.#authService.generateForgotPasswordToken(
        updateUserData,
        "sent code"
      );

      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }

  async verify(req, res, next) {
    try {
      const dto = req.body;

      validater(verifyDto, dto);

      const currentUser = req.currentUser;

      if (!currentUser.code) {
        throw new CustomError(400, "you first should be sent code");
      }

      if (currentUser.count >= 3) {
        currentUser.count = 0;
        currentUser.code = null;
        currentUser.isVerified = false;
        await this.#userService.update(currentUser._id, currentUser);

        throw new CustomError(400, "you have tried 3 times");
      }

      if (dto.code === currentUser.code) {
        currentUser.count = 0;
        currentUser.code = null;
        currentUser.isVerified = true;
        await this.#userService.update(currentUser._id, currentUser);

        const resData = this.#authService.generateForgotPasswordToken(
          currentUser,
          "verifayed code"
        );

        return res.status(resData.status).json(resData);
      } else {
        currentUser.count = currentUser.count + 1;
        currentUser.isVerified = false;
        await this.#userService.update(currentUser._id, currentUser);

        const resData = new ResData(400, "wrong code try again");

        res.status(resData.status).json(resData);
      }
    } catch (error) {
      next(error);
    }
  }

  async changeNewPassword(req, res, next) {
    try {
      const dto = req.body;

      validater(changeForgotPasswordDto, dto);

      const currentUser = req.currentUser;
      if (!currentUser.isVerified) {
        throw new CustomError(400, "you should be verified");
      }

      const hashedPassword = await this.#myHashing.hash(dto.newPassword);

      currentUser.password = hashedPassword;
      currentUser.isVerified = false;

      await this.#userService.update(currentUser._id, currentUser);

      const resData = new ResData(200, "success");

      res.status(resData.status).json(resData);
    } catch (error) {
      next(error);
    }
  }
}

const authController = new AuthController(
  authService,
  userService,
  myJwt,
  myHashing
);

module.exports = { authController };
