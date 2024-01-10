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
    image: {
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
  if (user.password.length <= 0) return;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  next();
});

Schema.methods.ConfirmPassword = async function (String_password: string) {
  const isMatch = bcrypt.compare(String_password, this.password);
  return isMatch;
};

Schema.methods.updatePassword = async function (String_password: string) {
  const user = this;
  user.password = await bcrypt.hash(String_password, 10);
  return true;
};

export const UserModel = mongoose.models.user || mongoose.model("user", Schema);
