import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const Schema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
    },
    bio: {
      type: String,
    },
    phone: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// middlewares

Schema.pre("save", async function (next: any) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

Schema.methods.ConfirmPassword = async function (String_password: string) {
  const isMatch = bcrypt.compare(String_password, this.password);
  return isMatch;
};

export const UserModel = mongoose.models.user || mongoose.model("user", Schema);
