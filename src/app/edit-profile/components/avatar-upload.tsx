import { Input } from "@/components/ui/input";

export const AvatarUpload = () => {
  return (
    <>
      <Input
        type="file"
        id="fileInput"
        className="hidden"
        accept="image/png, image/jpeg, image/jpg"
        name="image"
      />
    </>
  );
};
